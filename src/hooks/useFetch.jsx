const useFetch = async (url, options) => {
  const res = await fetch(url, options)
  return res.json()
}

export default useFetch
