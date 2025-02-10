import { seedModels } from "@/server/seedModels";

export function SeedButton() {
  const handleClick = async () => {
    try {
      await seedModels();
      alert("Models seeded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to seed models.");
    }
  };

  return (
    <button onClick={handleClick}>Seed Models</button>
  );
}