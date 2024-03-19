backend almost done , this uses mangodb

for mysql version, see -> [this](https://github.com/aquaticcalf/backend-miniproject-mysql/)

- [ ] authentication
    - [x] jwt
    - [x] login
    - [x] register
    - [ ] refresh token
- [ ] posts
    - [ ] get all posts `/posts/`
    - [ ] get a perticular post `/posts/:postid`
    - [ ] create a new post `/posts/new`
    - [ ] search for a post `/posts/search?title=&tags=,`
    - [ ] edit post ??
- [ ] comments
    - [ ] get all comments for a perticular post `GET /comment/:postid`
    - [ ] create new comment under a post `POST /comment/:postid`
    - [ ] edit comment ??
- [ ] profiles
    - [ ] self profile `/profile/`
    - [ ] others profile `/profile/:username`
        - [ ] posts made by them
        - [ ] comments made by them
        - [ ] follow ?? 
        - [ ] edit profile ??