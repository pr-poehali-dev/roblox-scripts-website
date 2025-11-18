import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const categories = [
  { id: 'all', name: 'Все', icon: 'Grid3x3' },
  { id: 'esp', name: 'ESP', icon: 'Eye' },
  { id: 'aimbot', name: 'Aimbot', icon: 'Target' },
  { id: 'speed', name: 'Speed', icon: 'Zap' },
  { id: 'fly', name: 'Fly', icon: 'Plane' },
  { id: 'admin', name: 'Admin', icon: 'Shield' },
  { id: 'gui', name: 'GUI', icon: 'Monitor' },
];

const scripts = [
  {
    id: 1,
    title: 'Universal ESP',
    game: 'Any Game',
    category: 'esp',
    description: 'Показывает всех игроков через стены с отображением здоровья и дистанции',
    downloads: 15420,
    rating: 4.8,
    code: 'loadstring(game:HttpGet("https://example.com/esp.lua"))()',
  },
  {
    id: 2,
    title: 'Speed Hack Pro',
    game: 'Brookhaven',
    category: 'speed',
    description: 'Увеличивает скорость передвижения персонажа до 200%',
    downloads: 12340,
    rating: 4.6,
    code: 'loadstring(game:HttpGet("https://example.com/speed.lua"))()',
  },
  {
    id: 3,
    title: 'Fly Script V2',
    game: 'Universal',
    category: 'fly',
    description: 'Полёт с контролем скорости и высоты. Работает на всех играх',
    downloads: 18950,
    rating: 4.9,
    code: 'loadstring(game:HttpGet("https://example.com/fly.lua"))()',
  },
  {
    id: 4,
    title: 'Arsenal Aimbot',
    game: 'Arsenal',
    category: 'aimbot',
    description: 'Автоприцеливание с настройкой FOV и smoothness для Arsenal',
    downloads: 22100,
    rating: 4.7,
    code: 'loadstring(game:HttpGet("https://example.com/arsenal-aim.lua"))()',
  },
  {
    id: 5,
    title: 'Admin Commands',
    game: 'Universal',
    category: 'admin',
    description: 'Полный набор админ команд: kill, teleport, fly, noclip и другие',
    downloads: 9870,
    rating: 4.5,
    code: 'loadstring(game:HttpGet("https://example.com/admin.lua"))()',
  },
  {
    id: 6,
    title: 'Mega GUI Hub',
    game: 'Multiple',
    category: 'gui',
    description: 'Универсальный GUI со всеми функциями: ESP, Aimbot, Speed, Fly',
    downloads: 31200,
    rating: 4.9,
    code: 'loadstring(game:HttpGet("https://example.com/megahub.lua"))()',
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredScripts = scripts.filter(script => {
    const matchesSearch = 
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || script.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const copyScript = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Скрипт "${title}" скопирован!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <div className="container mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-secondary p-1 mb-12">
          <div className="relative bg-background/95 backdrop-blur rounded-3xl p-12 text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-lg rotate-12"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-secondary rounded-lg -rotate-12"></div>
              <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-accent rounded-lg rotate-45"></div>
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent relative z-10">
              ROBLOX SCRIPTS
            </h1>
            <p className="text-xl text-muted-foreground mb-8 relative z-10">
              Лучшие скрипты для Roblox. Работают на всех эксплойтах
            </p>
            <div className="flex gap-4 justify-center relative z-10">
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Icon name="Download" size={16} className="mr-2" />
                150K+ Загрузок
              </Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Icon name="Star" size={16} className="mr-2" />
                4.8 Рейтинг
              </Badge>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск по названию игры или функционалу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-2 border-border hover:border-primary transition-colors"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start overflow-x-auto bg-card p-2 h-auto flex-wrap gap-2">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent px-6 py-3"
              >
                <Icon name={category.icon as any} size={18} className="mr-2" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={selectedCategory} className="mt-8">
            {filteredScripts.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScripts.map(script => (
                  <Card 
                    key={script.id}
                    className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 bg-card border-2 border-border hover:border-primary"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge className="bg-gradient-to-r from-primary to-accent">
                          {script.game}
                        </Badge>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Icon name="Star" size={16} fill="currentColor" />
                          <span className="font-semibold">{script.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {script.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {script.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Download" size={16} />
                          <span>{script.downloads.toLocaleString()}</span>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {categories.find(c => c.id === script.category)?.name}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => copyScript(script.code, script.title)}
                        className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-semibold text-base h-12"
                      >
                        <Icon name="Copy" size={18} className="mr-2" />
                        Скопировать скрипт
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-card border-2 border-border rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Icon name="Info" className="text-primary" />
            Как использовать скрипты
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Установи эксплойт</h3>
                <p className="text-muted-foreground">Скачай Synapse X, KRNL или любой другой эксплойт</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Скопируй скрипт</h3>
                <p className="text-muted-foreground">Нажми кнопку "Скопировать" на нужном скрипте</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Запусти в игре</h3>
                <p className="text-muted-foreground">Вставь код в эксплойт и нажми Execute</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
