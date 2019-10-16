define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/admin/login",
    "title": "Admin Login Request",
    "name": "Admin_Login",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"user\": {\n   \"id\": 5,\n   \"username\": \"example\",\n   \"email\": \"example@gmonk.com\",\n   \"password\": \"$2a$14$IF9EQY7mpuNU2a5TVAAE8O7GLmcHBFRvEiv5jCl5RT1uJa1mojudS\",\n   \"city_id\": 1,\n   \"state_id\": 1\n },\n \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicGd1c2VyMTAwIiwidXNlclR5cGUiOiJjb25zdW1lciIsImlhdCI6MTU2OTM0NzE3NiwiZXhwIjoxNTY5NDMzNTc2fQ.EfLfuc_DcYZ5TtjM-Zpd7mwkUPozNhYh-i5jg3YQ-us\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Example Body:",
          "content": "{\n\t\"username\": \"example\",\n\t\"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./auth/adminAuth.js",
    "groupTitle": "Auth"
  }
] });
