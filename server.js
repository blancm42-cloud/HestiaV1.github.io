const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize SQLite database
const db = new sqlite3.Database('./hestia.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

// Create tables
function initDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lastName TEXT NOT NULL,
      firstName TEXT NOT NULL,
      age INTEGER NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating users table:', err);
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      question1 TEXT,
      question2 TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('Error creating responses table:', err);
  });
}

// API Routes

// Register new user
app.post('/api/register', async (req, res) => {
  try {
    const { lastName, firstName, age, email, password, question1, question2 } = req.body;

    // Validate password requirements
    if (password.length < 8) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères' });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins une majuscule' });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins un caractère spécial' });
    }

    // Check if email exists
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      if (row) {
        return res.status(400).json({ error: 'Cet email est déjà enregistré' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.run(
        'INSERT INTO users (lastName, firstName, age, email, password) VALUES (?, ?, ?, ?, ?)',
        [lastName, firstName, age, email, hashedPassword],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
          }

          const userId = this.lastID;

          // Insert responses
          db.run(
            'INSERT INTO responses (userId, question1, question2) VALUES (?, ?, ?)',
            [userId, question1, question2],
            (err) => {
              if (err) {
                console.error('Error saving responses:', err);
              }
            }
          );

          res.json({ 
            success: true, 
            message: 'Inscription réussie !',
            userId: userId
          });
        }
      );
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin account
    if (email === 'admin' && password === 'admin') {
      return res.json({ 
        success: true, 
        message: 'Connexion réussie !',
        user: { email: 'admin', firstName: 'Admin', isAdmin: true }
      });
    }

    // Check database
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Identifiants incorrects' });
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Identifiants incorrects' });
      }

      res.json({ 
        success: true, 
        message: `Bienvenue ${user.firstName} !`,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur de connexion' });
  }
});

// Get all users (admin only)
app.get('/api/users', (req, res) => {
  db.all(`
    SELECT 
      u.id, u.lastName, u.firstName, u.age, u.email, u.createdAt,
      r.question1, r.question2, r.timestamp as responseTimestamp
    FROM users u
    LEFT JOIN responses r ON u.id = r.userId
    ORDER BY u.createdAt DESC
  `, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json({ users: rows });
  });
});

// Get user responses
app.get('/api/responses/:userId', (req, res) => {
  const { userId } = req.params;
  
  db.get(`
    SELECT r.*, u.firstName, u.lastName, u.email
    FROM responses r
    JOIN users u ON r.userId = u.id
    WHERE r.userId = ?
  `, [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json({ response: row });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});
