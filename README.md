# start
```
git clone THISREPOSITORY
docker-compose up -d --build
```

# test

#### sign up test
```
curl -X POST -H "Content-Type: application/json" -d '{"mail":"test@example.com", "password":"p@$$w0rd"}' localhost/signup
```
#### sign in test
```
curl -X POST -H "Content-Type: application/json" -d '{"mail":"test@example.com", "password":"p@$$w0rd"}' localhost/signin
```