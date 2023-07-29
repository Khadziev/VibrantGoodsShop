const ErrorPage = () => {

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Произошла ошибка</p>
      <button onClick={reloadPage}>Обновить страницу</button>
    </div>
  )
}

export default ErrorPage
