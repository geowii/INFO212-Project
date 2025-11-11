import sqlite3
import os

db_path = os.path.abspath('database.db')

# try:
#     connectionDB = sqlite3.connect("./database/gamertok.db")
#     cursor = connectionDB.cursor()
#     print("DB connected")
# 
#     query = 'SELECT sqlite_version()'
#     cursor.execute(query)
# 
#     result = cursor.fetchall()
#     print(f'SQLite versio is {result[0][0]}')
# 
#     cursor.close()
# except sqlite3.Error as error:
#     print('Error occured -', error)
# 
# finally:
#     if connectionDB:
#         connectionDB.close()
#         print()
    
def insert(data, mode):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    options = {
        'users': "INSERT INTO users VALUES (?, ?, ?, ?, ?)",
        'content': "INSERT INTO content VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        'user_comment': "INSERT INTO user_comment VALUES (?, ?, ?, ?, ?, ?)",
        'user_interactions': "INSERT INTO user_interactions VALUES (?, ?, ?, ?)" 
    }

    try: 
        cursor.executemany(options[mode], data)

        optionsAfter = {
            'users': "SELECT * FROM users",
            'content': "SELECT * FROM content",
            'user_comment': "SELECT * FROM user_comment",
            'user_interactions': "SELECT * FROM user_interactions" 
        }
        # Display data
        print('Data inserted: ')
        result = []
        cursor.execute(optionsAfter[mode])
        for row in cursor.fetchall():
            print(row)
            result.append(row)
        return result
    except sqlite3.Error as error:
        print(error)

    finally:
        conn.commit()
        conn.close()

def delete(idNumber, mode):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    options = {
        'users': "DELETE FROM users WHERE user_id=?",
        'content': "DELETE FROM content WHERE content_id=?"
    }

    try: 
        optionsAfter = {
            'users': "User deleted",
            'content': "Content deleted"
        }

        cursor.execute(options[mode], [(idNumber)])
        print(optionsAfter[mode])

    except sqlite3.Error as error:
        print(error)

    finally:
        conn.commit()
        conn.close()

def get(data, mode):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    options ={
        'users': "SELECT * FROM users WHERE user_id=?",
        'content': "SELECT * FROM content WHERE content_id=? AND user_id=?",
        'user_comment': "SELECT * FROM user_comment WHERE content_id=? AND user_id=? AND comment=?",
        'user_interactions': "SELECT * FROM user_interactions WHERE content_id=? AND user_id=?" 
    }

    try: 
        optionsAfter = {
            'users': "User gathered.",
            'content': "Content gathered",
            'user_comment': "User comment gathered",
            'user_interactions': "User interaction gathered" 
        }

        cursor.execute(options[mode], data)
        for row in cursor.fetchall():
            return list(row)
        print(optionsAfter[mode])

    except sqlite3.Error as error:
        print(error)

    finally:
        conn.commit()
        conn.close()

def update(data, idNumber, mode):
    delete(idNumber, mode)
    return insert(data, mode)

def getAllCorI(idNumber, mode):
    result = []
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    options = {
        'user_comment': "SELECT * FROM user_comment WHERE content_id=?",
        'user_interactions': "SELECT * FROM user_interactions WHERE content_id=?" 
    }

    try:
        cursor.execute(options[mode], [(idNumber)])

        print('Data gathered: ')
        for row in cursor.fetchall():
            result.append(row)
        print(result)
        return result
    except sqlite3.Error as error:
        print(error)
        return []

    finally:
        conn.commit()
        conn.close()

def getAll(mode):
    result = []
    modes = ["users", "content", "user_comment", "user_interactions"]

    if mode == "all":
        for sub in modes:
            sub_res = getAll(sub)
            if sub_res:
                result.extend(sub_res)
        return result
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    options = {
        'users': "SELECT * FROM users",
        'content': "SELECT * FROM content",
        'user_comment': "SELECT * FROM user_comment",
        'user_interactions': "SELECT * FROM user_interactions" 
    }

    try:
        cursor.execute(options[mode])

        print('Data gathered: ')
        result.append(mode)
        for row in cursor.fetchall():
            result.append(row)
        print(result)
        return result
    except sqlite3.Error as error:
        print(error)
        return []

    finally:
        conn.commit()
        conn.close()

def delAll(mode):
    modes = ["users", "content", "user_comment", "user_interactions"]

    if mode == "all":
        for sub in modes:
            delAll(sub)
        return "All tables cleared"
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    options = {
        'users': "DELETE FROM users",
        'content': "DELETE FROM content",
        'user_comment': "DELETE FROM user_comment",
        'user_interactions': "DELETE FROM user_interactions"
    }

    try: 
        optionsAfter = {
            'users': "All users deleted",
            'content': "All content deleted",
            'user_comment': "All comments deleted",
            'user_interactions': "All interactions deleted"
        }

        cursor.execute(options[mode])
        print(optionsAfter[mode])
        return optionsAfter[mode]

    except sqlite3.Error as error:
        print(error)
        return str(error)

    finally:
        conn.commit()
        conn.close()

def customQuery(query): 
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    result = []

    try: 
        cursor.execute(query)

        for row in cursor.fetchall():
            result.append(row)
            print(row)
        return result

    except sqlite3.Error as error:
        print(error)
        return error

    finally:
        conn.commit()
        conn.close()

# Test av kode.
# delAll("users")
# delAll("content")
# insert([('admin', 0, 'admin', '', '', 0, '')], 'users')
# insert([(32, 'league_clip.mp4', 54, 82, 'league_of_legends', 'moba', 12, 2)], 'content')
# delete(32, "content")
# update([('admin', 3, 'admin', '', '', 0, '')], 0, 'users')
# getAll("users")
# delAll("all")