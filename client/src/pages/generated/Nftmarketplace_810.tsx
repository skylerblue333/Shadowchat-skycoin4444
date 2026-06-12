// AUTO-GENERATED DRAFT SCREEN: NFTMarketplace
import React, { useState, useEffect } from 'react';
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";

interface NFT {
  id: string;
  title: string;
  artist: string;
  price: string;
  imageUrl: string;
}

const mockFetchNFTs = (): Promise<NFT[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // Simulate 90% success rate
        resolve([
          {
            id: "1",
            title: "Abstract Art #001",
            artist: "CryptoArtist",
            price: "1.2 ETH",
            imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=NFT+1",
          },
          {
            id: "2",
            title: "Digital Landscape",
            artist: "PixelPainter",
            price: "0.8 ETH",
            imageUrl: "https://via.placeholder.com/150/0000FF/FFFFFF?text=NFT+2",
          },
          {
            id: "3",
            title: "Futuristic City",
            artist: "VoxelVisionary",
            price: "2.5 ETH",
            imageUrl: "https://via.placeholder.com/150/00FF00/FFFFFF?text=NFT+3",
          },
          {
            id: "4",
            title: "Neon Portrait",
            artist: "GlowGuru",
            price: "0.5 ETH",
            imageUrl: "https://via.placeholder.com/150/FFFF00/000000?text=NFT+4",
          },
          {
            id: "5",
            title: "Cyberpunk Alley",
            artist: "SynthwaveSculptor",
            price: "1.8 ETH",
            imageUrl: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=NFT+5",
          },
          {
            id: "6",
            title: "Geometric Abstraction",
            artist: "ShapeShifter",
            price: "0.3 ETH",
            imageUrl: "https://via.placeholder.com/150/00FFFF/000000?text=NFT+6",
          },
        ]);
      } else {
        reject(new Error("Failed to fetch NFTs."));
      }
    }, 1000); // Simulate network delay
  });
};

const NFTMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await mockFetchNFTs();
        setNfts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchNFTData();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const filteredNFTs = nfts.filter((nft) => {
    const matchesSearch = nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nft.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || nft.title.toLowerCase().includes(filterCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">NFT Marketplace</h1>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><Button variant="ghost">Explore</Button></li>
            <li><Button variant="ghost">My NFTs</Button></li>
            <li><Button variant="ghost">Create</Button></li>
            <li><Button>Connect Wallet</Button></li>
          </ul>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
          </div>
        </nav>
      </header>
      <main className="p-4 container mx-auto">
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Select onValueChange={setFilterCategory} defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="collectibles">Collectibles</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <h2 className="text-xl font-semibold mb-4">Featured NFTs</h2>
          {loading && <p className="text-center text-muted-foreground">Loading NFTs...</p>}
          {error && <p className="text-center text-destructive-foreground text-red-500">Error: {error}</p>}
          {!loading && !error && filteredNFTs.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No NFTs found matching your criteria.</p>
          )}
          {!loading && !error && filteredNFTs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredNFTs.map((nft) => (
                <Card key={nft.id}>
                  <CardHeader className="p-0">
                    <img src={nft.imageUrl} alt={nft.title} className="w-full h-48 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-medium">{nft.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{nft.artist}</CardDescription>
                    <p className="text-lg font-bold mt-2">{nft.price}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Buy Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default NFTMarketplace;