migration-client
================

A backbone.js client that uses the migration service. This utility pulls configuration files from a bucket on Amazon S3, find a matching configuration file on another Cloudfront, and compiles a diff of the two files. This has been sanitized for public presentation and therefore mostly broken functionally. 

This makes use of [this service](https://github.com/protonate/migration-service)
