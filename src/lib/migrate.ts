import { query } from "./db";

export async function runMigration(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS resume_submissions (
      id INT(11) NOT NULL AUTO_INCREMENT,
      student_id INT(11) NOT NULL,
      resume_url VARCHAR(500) NOT NULL,
      resume_public_id VARCHAR(300) NOT NULL,
      uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status ENUM('pending','completed','failed') DEFAULT 'pending',
      analysis LONGTEXT DEFAULT NULL,
      PRIMARY KEY (id),
      KEY student_id (student_id),
      CONSTRAINT resume_submissions_ibfk_1 
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
  `;

  try {
    await query(sql);
    console.log("Migration successful: resume_submissions table created.");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}
