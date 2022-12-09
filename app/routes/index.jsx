import { useLoaderData } from "@remix-run/react";

export default function Index() {
	const {todoJson, text, tokenObj, apiDevJson, dliObj} = useLoaderData()
	console.log(todoJson, text, tokenObj, apiDevJson, dliObj);
    return (
        <div>
			<h1>Remix Test App</h1>
			<h2>{text}</h2>
			<h3>Todo Title - {todoJson.title}</h3>
        </div>
    )
}

export async function loader(){
	const result = {}
	const response = await fetch("https://api-prod.nvidia.com/gfnadmin/v1/health")
	const text = await response.text()
	console.log(text, "Public api output")
	result.text = text

	const todoResponse = await fetch('https://jsonplaceholder.typicode.com/todos/1')
	const todoJson = await todoResponse.json()
	console.log(todoJson, "To do Json")
	result.todoJson = todoJson

	const tokenResponse = await fetch('https://api-prod.nvidia.com/npnlocator/statuscode')
	const tokenObj = await tokenResponse.json()
	console.log(tokenObj, "token object")
	result.tokenObj = tokenObj

	const dliResponse = await fetch('https://api-stage.nvidia.com/DLI/v1/dliInstructor?instructorId=0031W00002Hl7guQAB')
	const dliObj = await dliResponse.json()
	console.log(dliObj, "token object")
	result.dliObj = dliObj

	try {
		const apiDevResponse = await fetch("https://api-stage.nvidia.com/broadcast/v1/client/listBusinessUnit?locale=en-us")
		const apiDevJson = await apiDevResponse.json()
		console.log(apiDevJson)
		result.apiDevJSON = apiDevJson
	} catch (error) {
		console.log(error);
	}

	return result
}