import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, X, Loader2, Video, Cog, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomerManagement } from "@/components/admin/CustomerManagement";

interface Machine {
  id: string;
  name: string;
  description: string | null;
  category: string;
  image_url: string | null;
  video_url: string | null;
  technical_info: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "General",
    technical_info: "",
    is_featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const { data: machines, isLoading } = useQuery({
    queryKey: ["admin-machines"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("machines")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Machine[];
    },
    enabled: !!user,
  });

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `machines/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("machine-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("machine-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData & { image_url?: string | null }) => {
      const { error } = await supabase.from("machines").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-machines"] });
      queryClient.invalidateQueries({ queryKey: ["machines"] });
      queryClient.invalidateQueries({ queryKey: ["featured-machines"] });
      toast.success("Machine added successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to add machine: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Machine> }) => {
      const { error } = await supabase
        .from("machines")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-machines"] });
      queryClient.invalidateQueries({ queryKey: ["machines"] });
      queryClient.invalidateQueries({ queryKey: ["featured-machines"] });
      toast.success("Machine updated successfully!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update machine: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("machines").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-machines"] });
      queryClient.invalidateQueries({ queryKey: ["machines"] });
      queryClient.invalidateQueries({ queryKey: ["featured-machines"] });
      toast.success("Machine deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete machine: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({ name: "", description: "", category: "General", technical_info: "", is_featured: false });
    setImageFile(null);
    setImagePreview(null);
    setVideoFile(null);
    setVideoPreview(null);
    setEditingMachine(null);
    setIsDialogOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const uploadVideo = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `videos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("machine-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("machine-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl: string | null = editingMachine?.image_url || null;
      let videoUrl: string | null = editingMachine?.video_url || null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (videoFile) {
        videoUrl = await uploadVideo(videoFile);
      }

      const machineData = {
        ...formData,
        image_url: imageUrl,
        video_url: videoUrl,
      };

      if (editingMachine) {
        await updateMutation.mutateAsync({ id: editingMachine.id, data: machineData });
      } else {
        await createMutation.mutateAsync(machineData);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (machine: Machine) => {
    setEditingMachine(machine);
    setFormData({
      name: machine.name,
      description: machine.description || "",
      category: machine.category,
      technical_info: machine.technical_info || "",
      is_featured: machine.is_featured ?? false,
    });
    setImagePreview(machine.image_url);
    setVideoPreview(machine.video_url);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isAuthenticated={true} onLogout={signOut} />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Admin Panel
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage machines, customers and content
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="machines" className="space-y-6">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="machines" className="gap-2">
                <Cog className="w-4 h-4" />
                Machines
              </TabsTrigger>
              <TabsTrigger value="customers" className="gap-2">
                <Users className="w-4 h-4" />
                Customers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="machines">
              {/* Machine Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Machines
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Manage your equipment catalog
                  </p>
                </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" onClick={() => resetForm()}>
                  <Plus className="w-4 h-4" />
                  Add Machine
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">
                    {editingMachine ? "Edit Machine" : "Add New Machine"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Machine Image</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground text-sm">
                            Click to upload an image
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Video Upload */}
                  <div className="space-y-2">
                    <Label>Machine Video (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                      {videoPreview ? (
                        <div className="relative">
                          <video
                            src={videoPreview}
                            className="w-full h-32 object-cover rounded-lg"
                            controls
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setVideoFile(null);
                              setVideoPreview(null);
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <Video className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground text-sm">
                            Click to upload a video
                          </p>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Machine Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Industrial Robot Arm"
                      className="bg-background border-border"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="Robotics"
                      className="bg-background border-border"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Describe the machine overview..."
                      className="bg-background border-border min-h-[80px]"
                    />
                  </div>

                  {/* Technical Information */}
                  <div className="space-y-2">
                    <Label htmlFor="technical_info">Technical Information</Label>
                    <Textarea
                      id="technical_info"
                      value={formData.technical_info}
                      onChange={(e) =>
                        setFormData({ ...formData, technical_info: e.target.value })
                      }
                      placeholder="Enter detailed technical specs, advanced system details, certifications..."
                      className="bg-background border-border min-h-[100px]"
                    />
                  </div>

                  {/* Technical Information */}
                  <div className="space-y-2">
                    <Label htmlFor="technical_info">Technical Information</Label>
                    <Textarea
                      id="technical_info"
                      value={formData.technical_info}
                      onChange={(e) =>
                        setFormData({ ...formData, technical_info: e.target.value })
                      }
                      placeholder="Enter detailed technical specifications, advanced system details, certifications..."
                      className="bg-background border-border min-h-[120px]"
                    />
                  </div>

                  {/* Featured */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Machine</Label>
                    <Switch
                      id="featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_featured: checked })
                      }
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="hero"
                      className="flex-1"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : editingMachine ? (
                        "Update Machine"
                      ) : (
                        "Add Machine"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Machines Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              </div>
            ) : machines && machines.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">
                        Image
                      </th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">
                        Name
                      </th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground hidden md:table-cell">
                        Category
                      </th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground hidden lg:table-cell">
                        Featured
                      </th>
                      <th className="text-right p-4 text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {machines.map((machine) => (
                      <tr
                        key={machine.id}
                        className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                      >
                        <td className="p-4">
                          <div className="w-16 h-12 bg-secondary rounded-lg overflow-hidden">
                            {machine.image_url ? (
                              <img
                                src={machine.image_url}
                                alt={machine.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-6 h-6 border border-primary/30 rounded" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-foreground">
                            {machine.name}
                          </div>
                          <div className="text-sm text-muted-foreground md:hidden">
                            {machine.category}
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            {machine.category}
                          </span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          {machine.is_featured ? (
                            <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                              Featured
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(machine)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => deleteMutation.mutate(machine.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Cog className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  No Machines Yet
                </h3>
                <p className="text-muted-foreground text-sm">
                  Add your first machine
                </p>
              </div>
            )}
          </div>
            </TabsContent>

            <TabsContent value="customers">
              <CustomerManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
