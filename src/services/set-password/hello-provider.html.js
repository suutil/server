module.exports.resetPassword = ({
  name,
  resetPasswordUrl
}) => {
  name = name || ''
  resetPasswordUrl = resetPasswordUrl || ''

  return `
<!DOCTYPE HTML>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
  <style>
    html {
      font-family: Roboto;
      color: #8e8e8e;
      width: 80%;
      max-width: 800px;
      min-width: 300px;
      margin: auto;
    }

    .conditions {
      background-color: #f0f0f0;
      padding: 1rem;
      text-align: justify;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12px;
    }

    a {
      color: #b8251a
    }

    .calendar a {
      margin: 2rem;
    }

  </style>
</head>

<body>
  <img style="margin:auto; width:200px;display:block" src="http://beta.entry.es/assets/images/logo.png">
<br>
<br>
<div style="width: 188px; margin:auto;">
  <a target="_blank" href="https://www.facebook.com/MyEasyEntry/"><img style="padding: 10px;width: 40px;" src="http://beta.entry.es/assets/images/facebook-logo.png"></a>
  <a target="_blank" href="https://twitter.com/MyEasyEntry"><img style="padding: 10px; width: 40px;" src="http://beta.entry.es/assets/images/twitter-social-logotype.png"></a>
  <a target="_blank" href="https://www.linkedin.com/company-beta/3497782/"><img style="padding: 10px;width: 40px;" src="http://beta.entry.es/assets/images/linkedin-logo.png"></a>
</div>
<h1 style="text-align: center;">¿Has olvidado tu contraseña?</h1>
<h2 style="text-align: center;font-weight: normal;">
  Hola ${name}, no te preocupes
</h2>
<p style="text-align: center">
  Para recuperar tu cuenta, sólo tienes que hacer click en el siguiente enlace y seguir las instrucciones que te indicamos.
</p>
<div style="text-align: center">
  <a href="${resetPasswordUrl}" >Recuperar tu cuenta</a>
</div>

</body>

</html>
`
}
