async function getData(){
    const id = document.getElementById('keywords')
    const response = await fetch('http://localhost:3000/keyword',{
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
        body: JSON.stringify({
            'keyword': 'virus'
        }),
      })
    const result = await response.json()
    console.log(result)
    console.log(id)
}

async function getCategory(){
    const id = document.getElementById('keywords')
    const response = await fetch('http://localhost:3000/keyword',{
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
        body: JSON.stringify({
            'keyword': 'virus'
        }),
      })
    const result = await response.json()
    console.log(result)
    console.log(id)
}

async function getKeyword(){
    const id = document.getElementById('keywords')
    const response = await fetch('http://localhost:3000/keyword',{
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
        body: JSON.stringify({
            'keyword': 'virus'
        }),
      })
    const result = await response.json()
    console.log(result)
    console.log(id)
}
