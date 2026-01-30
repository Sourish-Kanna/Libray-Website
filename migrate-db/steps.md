# Steps to migrate

## Dump from Old DB

``` powershell
./mongodump.exe --uri="mongodb+srv://<old_user>:<old_pass>@<cluster>/siesgstlibrary" --archive=teammate_dump.archive --gzip
```

## Update Cloudinary Links

Update *Configs* in production_migration.js.

``` powershell
node production_migration.js
```

## Restore to New DB

``` powershell
 ./mongorestore.exe --uri="mongodb+srv://<new_user>:<new_pass>@<cluster>/" --archive=teammate_dump.archive --gzip --nsInclude="siesgstlibrary.*"
```
