CREATE TABLE bingo.cards (
    id          UUID,
    user_       CHARACTER(63),
    archived    BOOLEAN,
    squares     JSONB
);

CREATE TABLE bingo.users (
    id          UUID,
    username    CHARACTER(15),
    password    CHARACTER(63),
    friends     JSONB
);

CREATE TABLE bingo.templates (
    id          UUID,
    name        CHARACTER(63),
    squares     JSONB
);

INSERT INTO bingo.cards(user_, archived, squares) VALUES
('harry', FALSE, '[{
      "id": "1A",
      "req": "LGBTQIA List Book",
      "book": { "title": "The Song of Achilles", "author": "Madeline Miller" }
    },
    {
      "id": "1B",
      "req": "Weird Ecology",
      "book": { "title": "The Cloud Roads", "author": "Martha Wells" }
    },
    {
      "id": "1C",
      "req": "Two or More Authors",
      "book": {
        "title": "This is How You Lose the Time War",
        "author": "Amal El-Mohtar & Max Gladstone"
      }
    },
    {
      "id": "1D",
      "req": "Historical SFF",
      "book": {
        "title": "The Underground Railroad",
        "author": "Colson Whitehead"
      }
    },
    {
      "id": "1E",
      "req": "Set in Space",
      "book": { "title": "The Darkness Outside Us", "author": "Eliot Shrefer" }
    },
    {
      "id": "2A",
      "req": "Stand alone",
      "book": { "title": "Standalone", "author": "White Default" },
      "color": "#ffffff"
    },
    {
      "id": "2B",
      "req": "Anti-hero",
      "book": { "title": "Try with pink", "author": "test" },
      "color": "#ff00ff"
    },
    { "id": "2C", "req": "Book Club or Readalong Book", "book": null },
    {
      "id": "2D",
      "req": "Cool Weapon",
      "book": { "title": "One more time", "author": "orange" },
      "color": "#ff7f00"
    },
    {
      "id": "2E",
      "req": "Revolutions and Rebellions",
      "book": { "title": "Ogres", "author": "Adrian Tchaikovsky" }
    },
    {
      "id": "3A",
      "req": "Name in the Title",
      "book": {
        "title": "Jonathan Strange & Mr. Norrell",
        "author": "Susanna Clarke"
      }
    },
    { "id": "3B", "req": "Author uses Initials", "book": null },
    {
      "id": "3C",
      "req": "Published in 2022",
      "book": { "title": "Age of Ash", "author": "Daniel Abraham" }
    },
    {
      "id": "3D",
      "req": "Urban Fantasy",
      "book": { "title": "Glass Magician", "author": "Charlie N. Holmberg" }
    },
    {
      "id": "3E",
      "req": "Set in Africa",
      "book": { "title": "A Master of Djinn", "author": "P. Djeli Clark" }
    },
    {
      "id": "4A",
      "req": "Non-Human Protaganist",
      "book": { "title": "The Golem & the Jinni", "author": "Helene Wecker" }
    },
    {
      "id": "4B",
      "req": "Wibbly Wobbly Timey Wimey",
      "book": {
        "title": "The 7 1/2 Deaths of Evelyn Hardcastle",
        "author": "Stuart Turton"
      }
    },
    { "id": "4C", "req": "Five Short Stories", "book": null },
    { "id": "4D", "req": "Mental Health", "book": null },
    {
      "id": "4E",
      "req": "Self Published",
      "book": { "title": "Into the Labyrinth", "author": "John Bierce" }
    },
    { "id": "5A", "req": "Awards Finalist", "book": null },
    {
      "id": "5B",
      "req": "BIPOC Author",
      "book": { "title": "Shorefall", "author": "Robert Jackson Bennett" },
      "color": "#0061ff"
    },
    { "id": "5C", "req": "Shape-shifters", "book": null },
    { "id": "5D", "req": "No Ifs, Ands, or Buts", "book": null },
    {
      "id": "5E",
      "req": "Family Matters",
      "book": { "title": "The Cartographers", "author": "Peng Shepherd" }
    }]'::JSONB);

INSERT INTO bingo.users(username, password, friends) VALUES
('harry', '$2y$12$L6NPsiPeZQlZSG3785BDYONgzzX822pBSZTKS7xiWKtxjkZnAMceW', '["hermione", "ron"]'::JSONB),
('hermione', '$2y$12$.bOI.OcBL.6qotU8zMKy0OkIwmM0CKdtELK1jmKn/oF3uRdJf9d8u', '["harry", "ron"]'::JSONB),
('ron', '$2y$12$1hCFORHZoQgUuEA6L1OfpOHLVd9cZ17ihhcK2080YhtUd2mgkUdBa', '["hermione", "harry"]'::JSONB);