"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Lock, Check } from "lucide-react"
import { toast } from "sonner"
import CredentialsModal from './CredentialsModal'

interface Credential {
  id: number;
  username: string;
  password: string;
  name: string;
}

interface TestCredentialsCardProps {
  credentials: Credential[];
  onCredentialSelect: (credential: Credential) => void;
}

const TestCredentialsCard: React.FC<TestCredentialsCardProps> = ({
  credentials,
  onCredentialSelect
}) => {
  const [showAllCredentials, setShowAllCredentials] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const copyToClipboard = (text: string, type: string, itemId: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
    
    // Set copied state for this specific item
    setCopiedStates(prev => ({ ...prev, [itemId]: true }));
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [itemId]: false }));
    }, 2000);
  };

  const fillCredentials = (credential: Credential) => {
    onCredentialSelect(credential);
    toast.success(`Credentials filled for ${credential.name}`);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl ">
          <Lock className="w-5 h-5" />
          <span>Test Credentials</span>
        </CardTitle>
        <CardDescription>
          Use these credentials for testing. Click on any credential to auto-fill the form.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Display first 3 credentials */}
        <div className="space-y-3">
          {credentials.slice(0, 3).map((cred, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => fillCredentials(cred)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{cred.name}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Username:</span>
                  <div className="flex items-center space-x-1">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">{cred.username}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(cred.username, 'Username', `${cred.id}-username`);
                      }}
                    >
                      {copiedStates[`${cred.id}-username`] ? (
                        <Check className="h-3 w-3 text-green-600 transition-all duration-200" />
                      ) : (
                        <Copy className="h-3 w-3 transition-all duration-200" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Password:</span>
                  <div className="flex items-center space-x-1">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">{cred.password}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(cred.password, 'Password', `${cred.id}-password`);
                      }}
                    >
                      {copiedStates[`${cred.id}-password`] ? (
                        <Check className="h-3 w-3 text-green-600 transition-all duration-200" />
                      ) : (
                        <Copy className="h-3 w-3 transition-all duration-200" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Credentials Modal */}
        <CredentialsModal
          credentials={credentials}
          isOpen={showAllCredentials}
          onOpenChange={setShowAllCredentials}
          onCredentialSelect={fillCredentials}
        />
      </CardContent>
    </Card>
  );
};

export default TestCredentialsCard;