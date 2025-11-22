"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Skill {
    id: string;
    name: string;
    proficiency: number;
    category: string;
}

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await fetch("/api/skills");
            const data = await res.json();
            setSkills(data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this skill?")) return;

        try {
            await fetch(`/api/skills/${id}`, { method: "DELETE" });
            setSkills(skills.filter((s) => s.id !== id));
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-heading">Skills</h1>
                <Link
                    href="/admin/skills/new"
                    className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                    <Plus size={20} />
                    New Skill
                </Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            <th className="p-4 font-medium text-foreground/60">Name</th>
                            <th className="p-4 font-medium text-foreground/60">Proficiency</th>
                            <th className="p-4 font-medium text-foreground/60">Category</th>
                            <th className="p-4 font-medium text-foreground/60 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill) => (
                            <tr key={skill.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium">{skill.name}</td>
                                <td className="p-4">
                                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${skill.proficiency}%` }} />
                                    </div>
                                </td>
                                <td className="p-4 text-foreground/60">{skill.category}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/skills/${skill.id}`}
                                            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(skill.id)}
                                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {skills.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-foreground/40">
                                    No skills found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
