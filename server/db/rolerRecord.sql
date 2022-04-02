INSERT INTO public.roles("id", "parentId" , name, "role", "roleChild", "isDelete")
VALUES  (1, 1, 'admin', 31, 31, 0),
        (2, -1, 'view', 1, 0, 0),
        (3, -1, 'add', 2, 0, 0),
        (4, -1, 'edit', 4, 0, 0),
        (5, -1, 'delete', 8, 0, 0),
        (6, -1, 'approves', 16, 0, 0);