CREATE TABLE users (
    username CHAR(20) NOT NULL,
    user_id INTEGER UNIQUE,
    password CHAR(24) NOT NULL,
    followers TEXT DEFAULT '',
    follows TEXT DEFAULT '',
    PRIMARY KEY (user_id)
);

CREATE TABLE content (
    user_id INTEGER,
    content_id INTEGER UNIQUE,
    content TEXT DEFAULT '',
    content_title TEXT DEFAULT '',
    content_desc TEXT DEFAULT '',
    views INTEGER DEFAULT 0,
    game TEXT DEFAULT '',
    game_type TEXT DEFAULT '',
    likes INTEGER DEFAULT 0,
    PRIMARY KEY (content_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_interactions (
    username CHAR(20) NOT NULL,
    user_id INTEGER,
    content_id INTEGER UNIQUE,
    emojis TEXT DEFAULT '',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (content_id) REFERENCES content(content_id)
);

CREATE TABLE user_comment (
    username CHAR(20) NOT NULL,
    user_id INTEGER,
    content_id INTEGER,
    comment TEXT DEFAULT '',
    comment_likes INTEGER DEFAULT 0,
    comment_dislikes INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (content_id) REFERENCES content(content_id)
);