export const dummyResponse =
  '<p>You want to know what activities are available today.</p> {"options":[{"option_name":"for families","option_id":1000,"option_picture_link":"https://www.engadin.com/sites/engadin/files/styles/hero_xlarge/public/2025-04/familie-unterengadin-andrea-badrutt.jpg","option_summary":"Family activities with kids camp, trampoline and adventure world in Silvaplana"},{"option_name":"in the mountains","option_id":1001,"option_picture_link":"https://www.myswisstrek.ch/images/g09-02-corvatsch_1038.jpg","option_summary":"Activities in the mountains of Silvaplana"},{"option_name":"on the water","option_id":1002,"option_picture_link":"https://images.interhome.group/travelguide/switzerland-silvaplana-lake.jpg","option_summary":"Everything you can do on Lake Silvaplana"},{"option_name":"in the air","option_id":1003,"option_picture_link":"https://mountains.ch/fileadmin/user_upload/Bilddatenbank_HP/Bergerlebnis/Muottas-Muragl/Winter/Paragliding/2023-paragliding-engadin-passagierfluege-muottas-muragl-723862.jpg","option_summary":"Work or even fly inspired in Silvaplana."}],"fe_option_description_link_text":"More information","fe_input_field_text":"Write a message..."} <p>Choose from family-friendly activities, mountain adventures, water-based fun, or aerial experiences.</p><p>What kind of activity would you like to do today?</p>';

export function parseApiResponse(response: string) {
  // First, try to match JSON in markdown code blocks
  const jsonBlockRegex = /```json\s*([\s\S]*?)\s*```/;
  const markdownMatch = response.match(jsonBlockRegex);

  if (markdownMatch) {
    // Handle markdown format
    const parts = response.split(jsonBlockRegex);
    try {
      return {
        success: true,
        type: "json" as const,
        htmlBefore: parts[0].trim(),
        htmlAfter: parts[2] ? parts[2].trim() : "",
        json: JSON.parse(markdownMatch[1]),
      };
    } catch (error) {
      return {
        success: false,
        type: "error" as const,
        error: "JSON Parse Error: " + (error as Error).message,
      };
    }
  }

  // If no markdown JSON block found, try to find inline JSON
  // Find the first opening brace
  const jsonStartIndex = response.indexOf("{");

  if (jsonStartIndex === -1) {
    // No JSON found, return as plain text
    return {
      success: true,
      type: "text" as const,
      htmlBefore: response,
      htmlAfter: "",
      json: null,
    };
  }

  // Find the matching closing brace by counting open/close braces
  let braceCount = 0;
  let jsonEndIndex = -1;

  for (let i = jsonStartIndex; i < response.length; i++) {
    if (response[i] === "{") {
      braceCount++;
    } else if (response[i] === "}") {
      braceCount--;
      if (braceCount === 0) {
        jsonEndIndex = i;
        break;
      }
    }
  }

  if (jsonEndIndex === -1) {
    // No matching closing brace, return as plain text
    return {
      success: true,
      type: "text" as const,
      htmlBefore: response,
      htmlAfter: "",
      json: null,
    };
  }

  // Try to parse the JSON and split the response
  try {
    const jsonString = response.substring(jsonStartIndex, jsonEndIndex + 1);
    const parsedJson = JSON.parse(jsonString);

    return {
      success: true,
      type: "json" as const,
      htmlBefore: response.substring(0, jsonStartIndex).trim(),
      htmlAfter: response.substring(jsonEndIndex + 1).trim(),
      json: parsedJson,
    };
  } catch (error) {
    // JSON parse failed, return as plain text
    return {
      success: true,
      type: "text" as const,
      htmlBefore: response,
      htmlAfter: "",
      json: null,
    };
  }
}
