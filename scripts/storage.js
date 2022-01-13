const now = new Date().toLocaleDateString()
const content = "Lorem ipsum01/22/2022 dolor sit 22/02/1394 amet, consectetur adipiscing elit 11/15/1956"
const altContent = "15/10/2001Lorem ipsum dolor sit amet"
export function Dates(content) {
    const result = content.match(/\d{2}[./-]\d{2}[./-]\d{4}/g)
    if(result === null) return "No dates"
    return result.toString().replace(/,/g , ", ")
}
export const imitationArray = [
                        ["Idea", now, "Idea", content, Dates(content)],
                        ["Another idea", now, "Idea", content, Dates(content)],
                        ["Task1", now, "Task", altContent, Dates(altContent)],
                        ["Thought", now, "Random Thought", altContent, Dates(altContent)],
                        ["quote", now, "Quote", content, Dates(content)],
                        ["Task2", now, "Task", altContent, Dates(altContent)],
                        ["Another quote", now, "Quote", content, Dates(content)]
                       ]