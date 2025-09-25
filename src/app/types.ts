export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Content {
  type: "text" | "options";
  data: TextData | OptionsData;
}

interface TextData {
  text: string;
}

interface OptionsData {
  intro: string;
  options: Option[];
  outro: string;
}

interface Option {
  option_name: string;
  option_id: number;
  option_picture_link: string;
  cost: string;
  cost_unit: string;
  option_summary: string;
}
