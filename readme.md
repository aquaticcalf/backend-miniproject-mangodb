backend not yet done , this uses mangodb

for mysql version, see -> [this](https://github.com/aquaticcalf/backend-miniproject-mysql/)

- [ ] authentication
    - [x] jwt
    - [x] login
    - [x] register
    - [ ] refresh token
- [x] posts
    - [x] get all posts `/posts/`
    - [x] get a perticular post `/posts/:postid`
    - [x] create a new post `/posts/new`
    - [x] search for a post `/posts/search?title=&tags=,`
    - [ ] edit post ??
- [x] comments
    - [x] get all comments for a perticular post `GET /comment/:postid`
    - [x] create new comment under a post `POST /comment/:postid`
    - [ ] edit comment ??
- [x] profiles
    - [x] self profile `/profile/`
    - [x] others profile `/profile/:username`
        - [x] posts made by them
        - [x] comments made by them
        - [ ] follow ?? 
        - [ ] edit profile ??