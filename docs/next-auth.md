# Getting Authorization in Insomnia

Login in to an account in your local environment and open developer tools. Go to the network tab and find a `session` GET request. In the headers of that correct, copy the value of `Set-Cookie`. It should look like this:

```
next-auth.session-token=<JWT SESSION TOKEN GOES HERE>; Path=/; Expires=Wed, 10 May 2023 00:10:26 GMT; HttpOnly; SameSite=Lax
```

In the Header section of the Insomnia request, add a new field `Cookie` and paste that value in.

