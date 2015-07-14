# Filepack

When maintaining a group of files and folders which changes often, it can be
difficult to distribute the changes efficiently - so clients can dowload only
the changed or new files.

`filepack` aims to provide a way of describing such file packs, and a client
that can create and install them. A `filepack` server must serve each file at a
path containing it's hash.

Example filepack.json:

```
{
"name": "Example Pack",
"tag": "v0.1",
"filepack": {
        "dirs": [
            {
                "name": "bin",
                    "files": [
                    {
                        "name": "www",
                        "md5": "36949fa0b2e544220891a91959a75cb7"
                    }
                ]
            }
        ],
        "files": [
            {
                "name": "style.css",
                "md5": "f76792457f3d7c6a8f7dcf18842f873f"
            }
        ]
    }
}
```

To install this particular pack:

`fp install http://example.com/filepack/example-pack ./dest`

`fp` will create `./dest` if needed, and request http://example.com/filepack/exaple-pack/filepack.json`,
and will then traverse it, creating the folder structure and requesting files. In this case it
will download two files:

http://exmaple.com/filepack/file/36949fa0b2e544220891a91959a75cb7
http://exmaple.com/filepack/file/f76792457f3d7c6a8f7dcf18842f873f

The filepack name is not part of the file url, since the same file can be part
of multiple filepacks.
