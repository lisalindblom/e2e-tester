import { contains } from "cypress/types/jquery";

describe("movieApp form", () => {
  it("should type", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Shrek").should("have.value", "Shrek");
  });
  it("should get 10 movies", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Shrek").should("have.value", "Shrek");
    cy.get("button").click();
    cy.get("div.movie").should("have.length", 10);
  });
  it("should display error message when wrong input", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type(".").clear();
    cy.get("button").click();
    cy.get("p").contains("Inga sökresultat att visa");
    cy.get("div.movie").should("have.length", 0);
  });
  it("should display error messageif empty input", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").clear();
    cy.get("button").click();
    cy.get("p").contains("Inga sökresultat att visa");
    cy.get("div.movie").should("have.length", 0);
  });
});

describe("movieservice", () => {
  let mockMovies: object = [
    {
      Title: "Shrek",
      imdbID: "1234",
      Type: "movie",
      Poster: "url",
      Year: "2005",
    },
    {
      Title: "Shrek 2",
      imdbID: "5678",
      Type: "movie",
      Poster: "url",
      Year: "2007",
    },
    {
      Title: "Shrek igen",
      imdbID: "9101",
      Type: "movie",
      Poster: "url",
      Year: "2009",
    },
    {
      Title: "Shrek fyra",
      imdbID: "9101",
      Type: "movie",
      Poster: "url",
      Year: "2011",
    },
  ];
  it("should get movies", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockMovies).as("movieCall");
    cy.get("input").type("Shrek").should("have.value", "Shrek");
    cy.get("button").click();
    cy.wait("@movieCall").its("request.url").should("contain", "s=Shrek");
    cy.get("@movieCall").its("response.body").should("have.length", 4);
  });
});
