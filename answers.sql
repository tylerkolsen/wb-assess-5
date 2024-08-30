-- Problem 1
SELECT email
FROM customers
ORDER BY email;

-- Problem 2
SELECT id
FROM orders
WHERE customer_id = (
    SELECT id
    FROM customers
    WHERE fname = 'Elizabeth'
        AND lname = 'Crocker'
);

-- Problem 3
SELECT SUM(num_cupcakes)
FROM orders
WHERE processed = 'f';

-- Problem 4
SELECT c.name, 
    SUM(o.num_cupcakes)
FROM cupcakes AS c
    LEFT JOIN orders AS o
        ON (c.id = o.cupcake_id)
GROUP BY c.name
ORDER BY c.name;

-- Problem 5
SELECT cust.email,
    SUM(o.num_cupcakes) AS sum
FROM customers AS cust 
    JOIN orders AS o
        ON (cust.id = o.customer_id)
GROUP BY cust.email
ORDER BY sum DESC;

-- Problem 6
SELECT DISTINCT c.fname, c.lname, c.email
FROM customers AS c
    JOIN orders AS o
        ON (c.id = o.customer_id)
WHERE o.cupcake_id = (
    SELECT id 
    FROM cupcakes
    WHERE name = 'funfetti'
)
    AND o.processed = 't';
