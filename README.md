# mini-wp

# API USER
## Error
Semua error pada API ini memiliki pola yang sama, yaitu memiliki key:
- error = object error
- source = bagian yang memberikan error
- message = pesan error
- statusCode = kode respon

**Contoh**
```json
{
    "error": {
        "errors": {
            "email": {
                "message": "Email already exists",
                "name": "ValidatorError",
                "properties": {
                    "message": "Email already exists",
                    "type": "user defined",
                    "path": "email",
                    "value": "test@gmail.com"
                },
                "kind": "user defined",
                "path": "email",
                "value": "test@gmail.com"
            }
        },
        "_message": "User validation failed",
        "message": "User validation failed: email: Email already exists",
        "name": "ValidationError"
    },
    "source": "database",
    "message": "User validation failed: email: Email already exists",
    "statusCode": 400
}

```
**CODE RESPONSE**

403 => diakibatkan oleh email/password salah, token tidak valid yang membuat aplikasi logout.

401 => request tidak memiliki authorisasi

400 => Bad Request, kesalahan dari client

500 => Error berasal dari internal server

## Register & LOGIN

Melakukan register dan login

**URL REGISTER** : `/users/register`

**URL LOGIN** : `/users/login`

**Method** : `POST`

**Auth Required** : NO

**Request Body REGISTER example**
```json
    {
        "name": "Gellert Grindelwald",
        "email": "gellert.g@dumstrang.com",
        "password": "password",
    }
```
**Request Body LOGIN example**
```json
    {
        "email": "gellert.g@dumstrang.com",
        "password": "password",
    }
```

**Success Response REGISTER & LOGIN**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2IzYmM0OTMzZDg5OTczNDBkODhjOTIiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNTU1MjgzMDE3LCJleHAiOjE1NTUzMDEwMTd9.DWZ0b0t_jm9HJeg9_J2oVqCweuWj1fEhXM-co4DW6U8",
    "username": "antonio",
    "imgSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK"
}
```
## LOGOUT
Untuk logout

**URL** : `/users/logout`

**Method** : `POST`

**Auth Required** : YES

**Success Response**
```json
{
    "message": "Successfully logout",
    "accountType": "default"
}
```

## Get Login User

Untuk mendapatkan informasi login user dengan menggunakan token yang di simpan pada browser

**URL** : `/users/user`

**Method** : `GET`

**Auth Required** : YES

**Success Response**
```json
{
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK",
    "accountType": "default",
    "_id": "5cb3bc4933d8997340d88c92",
    "name": "antonio",
    "email": "test@gmail.com",
    "password": "$2a$10$O1RwAXCFdgKnOAscYmTmOOoJBHJ/T37C3OunFPpPBC5aaoSX55ZKa",
    "createdAt": "2019-04-14T23:03:37.327Z",
    "updatedAt": "2019-04-14T23:03:37.327Z",
    "__v": 0
}
```
## Change Profile Picture

Untuk mengganti profpic user

**URL** : `/users/pp`

**Method** : `patch`

**Auth Required** : YES

**Request Body example (form-data)**
```json
    {
        "image": "File datatype",
    }
```

**Success Response**
```json
{
    "imageUrl": "https://storage.googleapis.com/miniwp.rubhiauliatirta.com/155528360249031396178.png"
}
```

## GET USER ARTICLE

Mendapatkan seluruh article milik login user

**URL** : `/articles`

**Params** : `?title` => query berdasarkan %title%

**Params** : `?tags` => query berdasarkan #tag

**Method** : `GET`

**Auth Required** : YES

**Success Response**
```json
[
  {
    "tags": [
      "ayam",
      "goreng",
      "enak",
      "sabana"
    ],
    "clap_count": 0,
    "_id": "5cb3c2d733d8997340d88c95",
    "title": "Sabana Fried Chicken",
    "content": "<h2>What is Lorem Ipsum Generator?</h2>\r\n\t\t<p>Welcome to the home of Lorem Ipsum text. You can build whole bunch \r\nof it using our super simple to use Lorem Ipsum Generator. There are \r\nplenty of variations possible; you can use Lorem Ipsum Generator to \r\nbuild your desired number of Lorem Ipsum paragraphs, words or sentences.\r\n Paragraphs, words, sentences. Our generator does them all. So, what can\r\n we get you from the Lorem Ipsum Generator menu today, sir?</p>\r\n\t\t<p>There are also other useful options that will come handy when using\r\n Lorem Ipsum text. Lorem Ipsum Generator can automatically insert HTML \r\nmarkup and make </p>",
    "featured_image": "https://storage.googleapis.com/miniwp.rubhiauliatirta.com/1555284694421img",
    "isPublished": true,
    "userId": {
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK",
      "accountType": "default",
      "_id": "5cb3c24333d8997340d88c94",
      "name": "Antonio",
      "email": "antonio@email.com",
      "password": "$2a$10$BseuAX87tPahx7PzePoQTOh/RNzP.ZkBDz9bT.mk.uYesdwUcaXF2",
      "createdAt": "2019-04-14T23:29:07.844Z",
      "updatedAt": "2019-04-14T23:29:07.844Z",
      "__v": 0
    },
    "createdAt": "2019-04-14T23:31:35.219Z",
    "updatedAt": "2019-04-14T23:46:43.530Z",
    "slug": "Sabana-Fried-Chicken-292783",
    "__v": 0
  },
  {
    "tags": [
      "hisana",
      "fried"
    ],
    "clap_count": 0,
    "_id": "5cb3c51e514901779dafce9d",
    "title": "Hisana Fried Chicken",
    "content": "<h2>What is Lorem Ipsum Generator?</h2>\r\n\t\t<p>Welcome to the home of Lorem Ipsum text. You can build whole bunch \r\nof it using our super simple to use Lorem Ipsum Generator. There are \r\nplenty of variations possible; you can use Lorem Ipsum Generator to \r\nbuild your desired number of Lorem Ipsum paragraphs, words or sentences all other Lorem Ipsum Generator \r\nfans? Thank you all, we try to do our best!</p>\r\n\t\t\r\n\t\t<h2>When Was Lorem Ipsum Born?</h2>\r\n\t\t<p>Now, l,",
    "featured_image": null,
    "isPublished": true,
    "userId": {
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK",
      "accountType": "default",
      "_id": "5cb3c24333d8997340d88c94",
      "name": "Antonio",
      "email": "antonio@email.com",
      "password": "$2a$10$BseuAX87tPahx7PzePoQTOh/RNzP.ZkBDz9bT.mk.uYesdwUcaXF2",
      "createdAt": "2019-04-14T23:29:07.844Z",
      "updatedAt": "2019-04-14T23:29:07.844Z",
      "__v": 0
    },
    "createdAt": "2019-04-14T23:41:18.698Z",
    "updatedAt": "2019-04-14T23:46:30.121Z",
    "slug": "asd-285601",
    "__v": 0
  }
]
```

## POST ARTICLE

**URL** : `/articles`

**Method** : `POST`

**Auth Required** : YES

**Body**
```json
{
  "title": "Auman Naga",
  "content": "lewmpfqpeofmqpoefqpekfpqfna;slkfna;lkfna;vslnsa;lkfoweifjawefnalwjf",
  "tags": [
    "tag"
  ],
  "featured_image": null,
  "isPublished": "true",
  "userId": "5cb3c24333d8997340d88c94"
}
```

**SUCCESS RESPONSE**
```json
{
  "tags": [
    "ayam"
  ],
  "clap_count": 0,
  "_id": "5cb3c92e1af18779b3161b14",
  "title": "Mencari Jati Diri",
  "content": "“Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do \r\neiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \r\nminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip \r\nex ea commodo consequat. Duis aute irure dolor in reprehenderit in \r\nvoluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \r\nsint occaecat cupidatat non proident, sunt in culpa qui officia deserunt\r\n mollit anim id est laborum,” said our Lorem Ipsum Generator and asked \r\nif you would like it in italics, bold and with some paragraphs.",
  "featured_image": "https://storage.googleapis.com/miniwp.rubhiauliatirta.com/1555286317545img",
  "isPublished": true,
  "userId": "5cb3c24333d8997340d88c94",
  "createdAt": "2019-04-14T23:58:38.608Z",
  "updatedAt": "2019-04-14T23:58:38.608Z",
  "slug": "Mencari-Jati-Diri-625167",
  "__v": 0
}
```

## DELETE ARTICLE

**URL** : `/articles/:articleId`

**Method** : `DELETE`

**Auth Required** : YES

**SUCCESS RESPONSE**
```json
{
    "message":"Delete Success"
}
```

## PATCH ARTICLE

**URL** : `/articles/:articleId`

**Method** : `PATCH`

**Auth Required** : YES

**BODY**
```json
{
  "title": "Auman Naga Hungarian Horntail",
  "content": "Sebuah artikel",
  "tags": [
    "tag1", "tag2"
  ],
  "featured_image": null,
  "isPublished": "true",
  "userId": "5cb3c24333d8997340d88c94"
}
```

**SUCCESS RESPONSE**
