"use client";

import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
	const [formData, setFormData] = useState({
		companyName: "",
		industry: "",
		goals: "",
		context: "",
	});
	const [trainingOutline, setTrainingOutline] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/generate-training", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to generate training')
            }

            const data = await response.json();
            console.log(data);
            setTrainingOutline(data.trainingOutline);
            router.refresh();
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false);
        }
    }

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSelectChange = (value: string) => {
		setFormData({ ...formData, industry: value });
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90">
			<main className="container mx-auto p-4">
				<h1 className="text-3xl font-bold mb-6 text-center text-white">
					Sustainability Training Generator
				</h1>
				<div className="grid md:grid-cols-2 gap-6 justify-center items-center">
					<Card className="bg-card/30 backdrop-blur-sm border-primary/10">
						<CardHeader>
							<CardTitle className="text-white">
								Input Company Details
							</CardTitle>
							<CardDescription className="text-white/70">
								Provide information about your company to
								generate a tailored sustainability training
								outline.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="space-y-4" onSubmit={handleSubmit}>
								<div className="space-y-2">
									<label
										htmlFor="companyName"
										className="text-sm font-medium text-white"
									>
										Company Name
									</label>
									<Input
										id="companyName"
										name="companyName"
										value={formData.companyName}
										onChange={handleChange}
										required
										className="bg-muted border-primary/20 text-white placeholder:text-white/50"
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="industry"
										className="text-sm font-medium text-white"
									>
										Industry
									</label>
									<Select
										onValueChange={handleSelectChange}
										value={formData.industry}
									>
										<SelectTrigger className="bg-muted border-primary/20 text-white">
											<SelectValue placeholder="Select an industry" />
										</SelectTrigger>
										<SelectContent className="bg-secondary border-primary/20">
											<SelectItem value="Technology">
												Technology
											</SelectItem>
											<SelectItem value="Manufacturing">
												Manufacturing
											</SelectItem>
											<SelectItem value="Retail">
												Retail
											</SelectItem>
											<SelectItem value="Healthcare">
												Healthcare
											</SelectItem>
											<SelectItem value="Finance">
												Finance
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="goals"
										className="text-sm font-medium text-white"
									>
										Sustainability Goals
									</label>
									<Textarea
										id="goals"
										name="goals"
										value={formData.goals}
										onChange={handleChange}
										required
										rows={3}
										className="bg-muted border-primary/20 text-white placeholder:text-white/50"
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="context"
										className="text-sm font-medium text-white"
									>
										Additional Context
									</label>
									<Textarea
										id="context"
										name="context"
										value={formData.context}
										onChange={handleChange}
										required
										rows={3}
										className="bg-muted border-primary/20 text-white placeholder:text-white/50"
									/>
								</div>
								<Button
									type="submit"
									disabled={isLoading}
									className="w-full bg-primary text-white hover:bg-primary/90"
								>
									{isLoading
										? "Generating..."
										: "Generate Training"}
								</Button>
							</form>
						</CardContent>
					</Card>

                    <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-white">Generated Training Outline</CardTitle>
                            <CardDescription className="text-white/70">
                                Your tailored sustainability training outline will appear here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {trainingOutline ? (
                                <div className="bg-muted/30 p-4 rounded-lg text-white text-sm">
                                    <ReactMarkdown>{trainingOutline}</ReactMarkdown>
                                </div>
                            ) : (
                                <p className="text-white/50 italic">
                                No training outline generated yet. Fill out the form and click "Generate Training" to see results.
                                </p>
                            )}
                        </CardContent>
                    </Card>
				</div>
			</main>
		</div>
	);
}
