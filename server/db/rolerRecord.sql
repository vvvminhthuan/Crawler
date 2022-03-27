INSERT INTO public.roles("parentId" , name, "role", "roleChild", "isDelete")
VALUES  (0, 'admin', 31, 31, 0),
        (-1, 'view', 1, 0, 0),
        (-1, 'add', 2, 0, 0),
        (-1, 'edit', 4, 0, 0),
        (-1, 'delete', 8, 0, 0),
        (-1, 'approves', 16, 0, 0);