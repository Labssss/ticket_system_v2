PGDMP         7                z            practica    15.1    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16618    practica    DATABASE     |   CREATE DATABASE practica WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE practica;
             	   api_pract    false                        2615    16619    api    SCHEMA        CREATE SCHEMA api;
    DROP SCHEMA api;
             	   api_pract    false                        2615    16630    auth    SCHEMA        CREATE SCHEMA auth;
    DROP SCHEMA auth;
             	   api_pract    false            ?            1259    16759    tickets    TABLE     $  CREATE TABLE api.tickets (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(100) NOT NULL,
    message character varying(1023) NOT NULL,
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    phone character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    feedbacktype character varying(100) NOT NULL,
    status character varying(100) DEFAULT 'ОТКРЫТА'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE api.tickets;
       api         heap 	   api_pract    false    6            ?            1259    16758    tickets_id_seq    SEQUENCE     ?   CREATE SEQUENCE api.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE api.tickets_id_seq;
       api       	   api_pract    false    219    6                       0    0    tickets_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE api.tickets_id_seq OWNED BY api.tickets.id;
          api       	   api_pract    false    218            ?            1259    16652    users    TABLE     ?   CREATE TABLE auth.users (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(255) DEFAULT 'USER'::character varying,
    phone character varying(100) NOT NULL
);
    DROP TABLE auth.users;
       auth         heap 	   api_pract    false    7            ?            1259    16651    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE auth.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE auth.users_id_seq;
       auth       	   api_pract    false    217    7                       0    0    users_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE auth.users_id_seq OWNED BY auth.users.id;
          auth       	   api_pract    false    216            n           2604    16762 
   tickets id    DEFAULT     b   ALTER TABLE ONLY api.tickets ALTER COLUMN id SET DEFAULT nextval('api.tickets_id_seq'::regclass);
 6   ALTER TABLE api.tickets ALTER COLUMN id DROP DEFAULT;
       api       	   api_pract    false    218    219    219            l           2604    16655    users id    DEFAULT     `   ALTER TABLE ONLY auth.users ALTER COLUMN id SET DEFAULT nextval('auth.users_id_seq'::regclass);
 5   ALTER TABLE auth.users ALTER COLUMN id DROP DEFAULT;
       auth       	   api_pract    false    217    216    217            	          0    16759    tickets 
   TABLE DATA                 api       	   api_pract    false    219   ?                 0    16652    users 
   TABLE DATA                 auth       	   api_pract    false    217   ?                  0    0    tickets_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('api.tickets_id_seq', 22, true);
          api       	   api_pract    false    218                       0    0    users_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('auth.users_id_seq', 17, true);
          auth       	   api_pract    false    216            v           2606    16768    tickets tickets_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY api.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY api.tickets DROP CONSTRAINT tickets_pkey;
       api         	   api_pract    false    219            r           2606    16662    users users_email_key 
   CONSTRAINT     O   ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 =   ALTER TABLE ONLY auth.users DROP CONSTRAINT users_email_key;
       auth         	   api_pract    false    217            t           2606    16660    users users_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY auth.users DROP CONSTRAINT users_pkey;
       auth         	   api_pract    false    217            w           2606    16769    tickets tickets_user_id_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY api.tickets
    ADD CONSTRAINT tickets_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
 C   ALTER TABLE ONLY api.tickets DROP CONSTRAINT tickets_user_id_fkey;
       api       	   api_pract    false    3188    217    219            	   ?  x?Ŕ?N1??y
?6???w??\??C?
??r_???J "???p?.?Ci?z?1 VJ?????1^B?Q?
???ן??7?[???-???JmUD????????#??|???&?0/??????!]А?????	?.?iLJM?}??sQB??oY?Q?rXB)	]8m?u?K???iїVsk?57?ή???o:?c???#??Bts?
?V!?TJ?sJ{??BuF?貴n??,?	?5??8?Q?Ҙ??7+?!Е??KV??????F??s?Ә??.%(?b<~Ʀ??iq?Ò?e}??>?!a?%X?}????#?	?k?ۈ?N?ng??b8?dBR??JN@???xC??6??lA?????????????/+?Xc?Z??Ӫ?v???7??????k??.???p????αK?O?s?????,?A??V_u?P?e?2         ?  x????n?@?;O??D????W0?????^Ʊ????G9?M?K??R???U%*??Ee?aY?A??Y><?[?7?O??p\?y???&???0B?hF?(7??U???t??Uq???Yy?>&?b:?W???[??8>m???ɾ޼}?߿?'Şt???????`??!'#???A?1u(P?M?A?YQ??Ω????oI???rW?׭??pP??9??
?\?0j?NҀ??B?;5?*[?M\???su?S??{?fRޙ???X?X?h-????D<"!_L??????NC?8I????dh?ㅢ??mj?;?jksh8??wi?Ø???EA??`?~?ܧ??ZA*?????zJ?x)????b?k????Hb*?<9j_Os??|zP?[????~?$H?
????LU?b???A?\??3^????}??˰:H???Eo???????2??\/?u???~q????[???@?2}*??}??3Cd???ѳ?f?Æa??U?E??؈#j     