import React from 'react';
import { Heart, Code, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">À propos</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Un raccourcisseur d'URL moderne, rapide et sécurisé. 
              Créez des liens courts élégants en quelques secondes.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Fonctionnalités</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-violet-500" />
                Raccourcissement instantané
              </li>
              <li className="flex items-center gap-2">
                <Code className="h-3 w-3 text-violet-500" />
                Interface moderne
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-3 w-3 text-violet-500" />
                Historique local
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Express.js', 'PostgreSQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-violet-100 text-violet-700 text-xs rounded-md font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © 2024 URL Shortener. Créé avec{' '}
              <Heart className="h-4 w-4 text-red-500 inline mx-1" />
              et beaucoup de café.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Fait avec React & Express.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;