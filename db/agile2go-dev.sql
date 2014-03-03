--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: assignments; Type: TABLE; Schema: public; Owner: rafaeljesus; Tablespace: 
--

DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS schema_migrations;
DROP TABLE IF EXISTS sprints;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_roles;


CREATE TABLE assignments (
    id integer NOT NULL,
    project_id integer,
    user_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.assignments OWNER TO rafaeljesus;

--
-- Name: assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: rafaeljesus
--

CREATE SEQUENCE assignments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assignments_id_seq OWNER TO rafaeljesus;

--
-- Name: assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rafaeljesus
--

ALTER SEQUENCE assignments_id_seq OWNED BY assignments.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE TABLE projects (
    id integer NOT NULL,
    name character varying(255),
    company character varying(255),
    description text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.projects OWNER TO rafaeljesus;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: rafaeljesus
--

CREATE SEQUENCE projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO rafaeljesus;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rafaeljesus
--

ALTER SEQUENCE projects_id_seq OWNED BY projects.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE TABLE roles (
    id integer NOT NULL,
    name character varying(255),
    resource_id integer,
    resource_type character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.roles OWNER TO rafaeljesus;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: rafaeljesus
--

CREATE SEQUENCE roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO rafaeljesus;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rafaeljesus
--

ALTER SEQUENCE roles_id_seq OWNED BY roles.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE TABLE schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO rafaeljesus;

--
-- Name: sprints; Type: TABLE; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE TABLE sprints (
    id integer NOT NULL,
    daily character varying(255),
    points character varying(255),
    start_date date,
    end_date date,
    project_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255)
);


ALTER TABLE public.sprints OWNER TO rafaeljesus;

--
-- Name: sprints_id_seq; Type: SEQUENCE; Schema: public; Owner: rafaeljesus
--

CREATE SEQUENCE sprints_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sprints_id_seq OWNER TO rafaeljesus;

--
-- Name: sprints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rafaeljesus
--

ALTER SEQUENCE sprints_id_seq OWNED BY sprints.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE TABLE tasks (
    id integer NOT NULL,
    title character varying(255),
    story text,
    status character varying(255),
    priority integer,
    sprint_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    points integer
);


ALTER TABLE public.tasks OWNER TO rafaeljesus;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: rafaeljesus
--

CREATE SEQUENCE tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO rafaeljesus;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rafaeljesus
--

ALTER SEQUENCE tasks_id_seq OWNED BY tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password_digest character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    confirmed_at timestamp without time zone,
    confirmation_token character varying(255)
);


ALTER TABLE public.users OWNER TO rafaeljesus;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: rafaeljesus
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO rafaeljesus;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rafaeljesus
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: users_roles; Type: TABLE; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE TABLE users_roles (
    user_id integer,
    role_id integer
);


ALTER TABLE public.users_roles OWNER TO rafaeljesus;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rafaeljesus
--

ALTER TABLE ONLY assignments ALTER COLUMN id SET DEFAULT nextval('assignments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rafaeljesus
--

ALTER TABLE ONLY projects ALTER COLUMN id SET DEFAULT nextval('projects_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rafaeljesus
--

ALTER TABLE ONLY roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rafaeljesus
--

ALTER TABLE ONLY sprints ALTER COLUMN id SET DEFAULT nextval('sprints_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rafaeljesus
--

ALTER TABLE ONLY tasks ALTER COLUMN id SET DEFAULT nextval('tasks_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rafaeljesus
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: assignments; Type: TABLE DATA; Schema: public; Owner: rafaeljesus
--

COPY assignments (id, project_id, user_id, created_at, updated_at) FROM stdin;
1	2	1	2014-02-22 03:18:19.372761	2014-02-22 03:18:19.372761
2	1	1	2014-02-22 13:54:12.443675	2014-02-22 13:54:12.443675
3	1	1	2014-02-22 14:07:20.510244	2014-02-22 14:07:20.510244
4	1	2	2014-02-22 14:07:20.512256	2014-02-22 14:07:20.512256
5	1	1	2014-02-22 14:08:59.345332	2014-02-22 14:08:59.345332
6	1	2	2014-02-22 14:08:59.346404	2014-02-22 14:08:59.346404
7	1	1	2014-02-22 14:21:40.336957	2014-02-22 14:21:40.336957
8	1	2	2014-02-22 14:21:40.34	2014-02-22 14:21:40.34
9	2	1	2014-02-22 18:53:17.942569	2014-02-22 18:53:17.942569
10	2	2	2014-02-22 18:53:17.94392	2014-02-22 18:53:17.94392
11	4	1	2014-03-03 15:20:02.846165	2014-03-03 15:20:02.846165
\.


--
-- Name: assignments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rafaeljesus
--

SELECT pg_catalog.setval('assignments_id_seq', 11, true);


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: rafaeljesus
--

COPY projects (id, name, company, description, created_at, updated_at) FROM stdin;
4	Todo App	Crafting	Todo App organizes your recurring reminders!\nAdd your tasks in a natural way and choose what you want to do.\nWhen the time comes, we will send you an email to remind you.	2014-03-03 15:20:02.843931	2014-03-03 15:20:02.843931
\.


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rafaeljesus
--

SELECT pg_catalog.setval('projects_id_seq', 4, true);


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: rafaeljesus
--

COPY roles (id, name, resource_id, resource_type, created_at, updated_at) FROM stdin;
\.


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rafaeljesus
--

SELECT pg_catalog.setval('roles_id_seq', 1, false);


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: rafaeljesus
--

COPY schema_migrations (version) FROM stdin;
20140217020625
20131224021030
20131224151231
20131231051413
20140106225210
20140209213929
20140301222615
20140302122520
20140302122636
\.


--
-- Data for Name: sprints; Type: TABLE DATA; Schema: public; Owner: rafaeljesus
--

COPY sprints (id, daily, points, start_date, end_date, project_id, created_at, updated_at, name) FROM stdin;
11	10:00	300	2014-03-01	2014-03-15	4	2014-03-03 17:39:58.858701	2014-03-03 17:39:58.858701	Sprint1
\.


--
-- Name: sprints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rafaeljesus
--

SELECT pg_catalog.setval('sprints_id_seq', 11, true);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: rafaeljesus
--

COPY tasks (id, title, story, status, priority, sprint_id, created_at, updated_at, points) FROM stdin;
7	Assign Tasks	When I sign in as "cherry@example.com"\nAnd I go to the tasks page\nAnd I create a task "Buy carrot cake mix" assigned to:                                                                                               \n| email |\n| apple@example.com |\n| banana@example.com |\nAnd I go to the tasks page\nThen I should see "Buy carrot cake mix"\n And I should see "Buy carrot cake mix" is assigned to "apple@example.com"\n And I should see "Buy carrot cake mix" is assigned to "banana@example.com"\n When I sign in as "apple@example.com"\n Then I should see "Buy carrot cake mix" is assigned to "apple@example.com"\n And I should see "Buy carrot cake mix" is assigned to "banana@example.com"\n When I sign in as "durian@example.com"\n Then I should not see "Buy carrot cake mix"	Todo	2	11	2014-03-03 13:40:00.814463	2014-03-03 21:25:36.193082	5
8	Attach a file to a task	When I attach "spec/fixtures/blueberries.jpg" to the "Buy" task\nThen I should see "blueberries.jpg" attached to the "Buy" task\nAnd I should see no attachments on the "Eat" task	Todo	4	11	2014-03-03 21:51:26.792191	2014-03-03 21:51:26.792191	3
10	Tasks start as uncomplete	When I go to the tasks page\nAnd I create a task "Make shopping list"\nThen I should see that "Make shopping list" is not complete	Todo	2	11	2014-03-03 21:52:42.509544	2014-03-03 21:52:42.509544	2
11	Create and complete a task	When I go to the tasks page\nAnd I create a task "Make shopping list"\nAnd I create a task "Pick up groceries"\nAnd I complete task "Make shopping list"\nAnd I go to the tasks page\nThen I should see that "Make shopping list" is complete\nAnd I should see that "Pick up groceries" is not complete	Todo	2	11	2014-03-03 21:53:21.846458	2014-03-03 21:53:21.846458	3
12	Uncomplete a task	When I go to the tasks page\nAnd I create a task "Make shopping list"\nAnd I create a task "Pick up groceries"\nAnd I complete task "Make shopping list"\nAnd I complete task "Pick up groceries"\nAnd I uncomplete task "Make shopping list"\nAnd I go to the tasks page\nThen I should see that "Make shopping list" is not complete\nAnd I should see that "Pick up groceries" is complete	Todo	2	11	2014-03-03 21:54:09.480617	2014-03-03 21:54:09.480617	2
9	Attach multiple files to a task	When I attach "spec/fixtures/blueberries.jpg" to the "Buy" task\nAnd I attach "spec/fixtures/strawberries.jpg" to the "Buy" task\nThen I should see "blueberries.jpg" attached to the "Buy" task\nAnd I should see "strawberries.jpg" attached to the "Buy" task	Todo	\N	11	2014-03-03 21:51:57.149995	2014-03-03 21:54:38.816973	\N
13	Create Task	When I go to the tasks page\nThen the page should not contain the task form\nAnd I follow "Add task"\nThen the page should contain the task form\nAnd I fill in "Title" with "A fresh new task"\nAnd I press "Create task"\nThen I should see "Created task: A fresh new task"\nWhen I follow "I'm done adding tasks"\nThen I should see "A fresh new task" within the tasks list	Todo	2	11	2014-03-03 21:55:34.919105	2014-03-03 21:55:34.919105	2
14	Filtering Tasks	 When I sign in as "email@example.com"\nAnd I am on the home page\nAnd I filter the tasks for "title: Master"\nThen I should see "Master Backbone" within the tasks list\nBut I should not see "Purchase the Backbone on Rails ebook" within the tasks list	Todo	1	11	2014-03-03 21:56:42.490021	2014-03-03 21:56:42.490021	5
15	Viewing Tasks	When I sign in as "email@example.com"\nAnd I am on the home page\nThen I should see "Master Backbone" within the tasks list\nAnd I should see "Purchase the Backbone on Rails ebook" within the tasks list	Todo	2	11	2014-03-03 21:58:48.937715	2014-03-03 21:58:48.937715	3
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rafaeljesus
--

SELECT pg_catalog.setval('tasks_id_seq', 15, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: rafaeljesus
--

COPY users (id, name, email, password_digest, created_at, updated_at, confirmed_at, confirmation_token) FROM stdin;
1	Rafael Jesus	rafael_jesus86@hotmail.com	$2a$10$knUzgmWeXtP/Iyaw1DhfHu5XH2Hc8.XrqpbwPQU.h1Y4uCMeTSb3q	2014-02-19 23:55:09.093444	2014-02-19 23:55:09.093444	\N	v0pbaRS38hwJRePHqOh9EQ
2	Sophia	soso@hotmail.com	$2a$10$aDv3FO79pm1Y5cQQMw.1/eMQrGLY4D3ruqoEtNJw1ZAciPb4VvNc2	2014-02-22 14:07:09.920245	2014-02-22 14:07:09.920245	\N	OU-HJoYUM_0Q8En6qTT6Zw
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rafaeljesus
--

SELECT pg_catalog.setval('users_id_seq', 2, true);


--
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: rafaeljesus
--

COPY users_roles (user_id, role_id) FROM stdin;
\.


--
-- Name: assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: rafaeljesus; Tablespace: 
--

ALTER TABLE ONLY assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (id);


--
-- Name: projects_pkey; Type: CONSTRAINT; Schema: public; Owner: rafaeljesus; Tablespace: 
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: roles_pkey; Type: CONSTRAINT; Schema: public; Owner: rafaeljesus; Tablespace: 
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sprints_pkey; Type: CONSTRAINT; Schema: public; Owner: rafaeljesus; Tablespace: 
--

ALTER TABLE ONLY sprints
    ADD CONSTRAINT sprints_pkey PRIMARY KEY (id);


--
-- Name: tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: rafaeljesus; Tablespace: 
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: rafaeljesus; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_assignments_on_project_id; Type: INDEX; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE INDEX index_assignments_on_project_id ON assignments USING btree (project_id);


--
-- Name: index_assignments_on_user_id; Type: INDEX; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE INDEX index_assignments_on_user_id ON assignments USING btree (user_id);


--
-- Name: index_roles_on_name; Type: INDEX; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE INDEX index_roles_on_name ON roles USING btree (name);


--
-- Name: index_roles_on_name_and_resource_type_and_resource_id; Type: INDEX; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE INDEX index_roles_on_name_and_resource_type_and_resource_id ON roles USING btree (name, resource_type, resource_id);


--
-- Name: index_sprints_on_project_id; Type: INDEX; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE INDEX index_sprints_on_project_id ON sprints USING btree (project_id);


--
-- Name: index_tasks_on_sprint_id; Type: INDEX; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE INDEX index_tasks_on_sprint_id ON tasks USING btree (sprint_id);


--
-- Name: index_users_roles_on_user_id_and_role_id; Type: INDEX; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE INDEX index_users_roles_on_user_id_and_role_id ON users_roles USING btree (user_id, role_id);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: rafaeljesus; Tablespace: 
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- Name: public; Type: ACL; Schema: -; Owner: rafaeljesus
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM rafaeljesus;
GRANT ALL ON SCHEMA public TO rafaeljesus;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

