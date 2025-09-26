import sqlite3, time


DB = "events.db"


def init_db():
conn = sqlite3.connect(DB)
c = conn.cursor()
c.execute('''
CREATE TABLE IF NOT EXISTS events (
id INTEGER PRIMARY KEY AUTOINCREMENT,
type TEXT,
message TEXT,
url TEXT,
patterns TEXT,
severity INTEGER,
ts INTEGER
)
''')
conn.commit()
conn.close()


def save_event(event: dict):
conn = sqlite3.connect(DB)
c = conn.cursor()
c.execute('INSERT INTO events (type,message,url,patterns,severity,ts) VALUES (?,?,?,?,?,?)',
(event.get("type"), event.get("message"), event.get("url"),
",".join(event.get("patterns",[])), event.get("severity",0), int(time.time())))
conn.commit()
conn.close()


async def get_recent_events():
conn = sqlite3.connect(DB)
c = conn.cursor()
c.execute('SELECT * FROM events ORDER BY ts DESC LIMIT 50')
rows = c.fetchall()
conn.close()
return [{"id":r[0],"type":r[1],"message":r[2],"url":r[3],"patterns":r[4].split(",") if r[4] else [],
"severity":r[5],"ts":r[6]} for r in rows]