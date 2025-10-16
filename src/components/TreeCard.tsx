import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Coins, MapPin, Trees } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TreeCardProps {
  imageUrl: string;
  username: string;
  userAvatar?: string;
  description?: string;
  location?: string;
  healthStatus?: string;
  treeCount: number;
  coinsEarned: number;
  createdAt: string;
}

const TreeCard = ({
  imageUrl,
  username,
  userAvatar,
  description,
  location,
  healthStatus,
  treeCount,
  coinsEarned,
  createdAt,
}: TreeCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt="Tree planting"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className="bg-primary/90 backdrop-blur-sm">
            <Trees className="h-3 w-3 mr-1" />
            {treeCount}
          </Badge>
          <Badge className="bg-secondary/90 backdrop-blur-sm">
            <Coins className="h-3 w-3 mr-1" />
            {coinsEarned}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src={userAvatar} />
            <AvatarFallback className="bg-secondary text-foreground">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{username}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        {description && (
          <p className="text-sm text-foreground line-clamp-2">{description}</p>
        )}

        {location && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        )}

        {healthStatus && (
          <p className="text-xs text-muted-foreground">Health: {healthStatus}</p>
        )}
      </div>
    </Card>
  );
};

export default TreeCard;