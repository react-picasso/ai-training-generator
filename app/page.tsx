import { generateTraining } from "@/actions/generateTraining";
import Image from "next/image";

export default function Home() {
	const result = generateTraining();
    console.log(result);
	return <h1>Hello there!</h1>;
}
