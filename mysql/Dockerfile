FROM mysql

COPY ./init/init.sql /docker-entrypoint-initdb.d/init.sql

CMD [ "mysql",'--init-file=/docker-entrypoint-initdb.d/init.sql' ]