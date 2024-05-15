INSERT INTO departments (department_name) VALUES
('Executive'),
('Marketing'),
('Sales'),
('Design');


INSERT INTO roles (title, salary, department_id) VALUES

('CEO', 4000000.00, 1),
('CFO', 3000000.00, 1),
('Head of Marketing', 400000.00, 2),
('Senior Marketing Associate', 200000.00, 2),
('Junior Marketing Associate', 90000.00, 2),
('Head of Sales', 600000.00, 3),
('Senior Sales Associate', 250000.00, 3),
('Junior Sales Associate', 140000.00, 3),
('Head of Design', 400000.00, 4),
('Senior Design Associate', 180000.00, 4),
('Junior Design Associate', 85000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES

('Arnold', 'Schwarzenagger', 1, 1),
('Danny', 'Devito', 2, 1),
('Halle', 'Berry', 3, 3),
('Keanu', 'Reaves', 4, 3),
('Brad', 'Pitt', 5, 3),
('Samuel', 'Jackson', 6, 6),
('Wynona', 'Ryder', 7, 6),
('Ryan','Reynolds', 8, 6),
('Emma', 'Stone', 9, 9),
('Jack', 'Black', 10, 9),
('Karen', 'Gillen', 11, 9);