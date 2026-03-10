# Steps to migrate

## Dump from Old DB

``` powershell
./mongodump.exe --uri="mongodb+srv://<old_user>:<old_pass>@<cluster>/siesgstlibrary" --archive=<file_nme>.archive --gzip
```

## Restore to New DB

``` powershell
 ./mongorestore.exe --uri="mongodb+srv://<new_user>:<new_pass>@<cluster>/" --archive=<file_nme>.archive --gzip --nsInclude="siesgstlibrary.*"
```

## Update Cloudinary Links

Update *Configs* in production_migration.js.

``` powershell
node production_migration.js
```
