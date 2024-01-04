INSERT INTO department (id,name) VALUES
  (1,'Sales'),
  (2,'Finance'),
  (3,'Human Resources'),
  (4,'IT');

INSERT INTO role (id,title, salary, department_id) VALUES
  (1,'Sales Manager', 80000, 1),
  (2,'Financial Analyst', 65000, 2),
  (3,'HR Specialist', 60000, 3),
  (4,'Software Engineer', 75000, 4);

INSERT INTO employee (id,first_name, last_name, role_id, manager_id) VALUES
  (1,'John', 'Doe', 1, NULL),
  (2,'Amera', 'Smith', 2, 1),
  (3,'Regina', 'Johnson', 3, 1),
  (4,'Christoper', 'Brown', 4, NULL);