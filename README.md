# File import automation

Project implements functionaly of import of csv files filth patient information into mongodb and creating report of import results.

To set up project type

````bash
docker-compose up -d
docker-compose exec node npm ci
````

in project directory.

Import command:

````bash
docker-compose exec node npm run import
````

Report creation:

````bash
docker-compose exec node npm run report
````

Report will be located in ```mochawesome-report``` directory.
Default file used for import is the ```source.csv```.

All environment and cofig variables are located in ```.env``` file;
To change file - edit file path variable ```IMPORT_FILE```.
!NB if file separator is different from | then edit variables ```IMPORT_PARSE_CONFIG``` and ```IMPORT_FILE_MAPPING```.
