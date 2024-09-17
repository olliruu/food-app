

let BASE_URL: String = "http://localhost:5000";

export async function getRandomRecepies(count : Number): Promise<any> {
  let response = await fetch(`${BASE_URL}/random_recepy/${sessionStorage.getItem("uid")}?count=${count}`);
  return await response.json();
}
export async function getRecepy(id:Number): Promise<any> {
  let response = await fetch(`${BASE_URL}/recepy/${id}`);
  return await response.json();
}
export async function getHistory(): Promise<any> {
  let response = await fetch(`${BASE_URL}/history/${sessionStorage.getItem("uid")}`);
  return await response.json();
}
export async function deleteHistory(id: Number): Promise<any> {
  let response = await fetch(`${BASE_URL}/history?id=${id}&uid=${sessionStorage.getItem("uid")}`, {
    method: 'DELETE',
  });
  return await response.json();
}
export async function register(name: string, password: string): Promise<any> {
  let response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ 'name': name, 'password': password })
  });
  return await response.json();
}
export async function login(name: string, password: string): Promise<any> {
  let response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ 'name': name, 'password': password })
  });
  return await response.json();
}
