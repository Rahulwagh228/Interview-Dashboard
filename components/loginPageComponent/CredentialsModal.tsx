"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"

interface Credential {
  id: number;
  username: string;
  password: string;
  name: string;
}

interface CredentialsModalProps {
  credentials: Credential[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCredentialSelect: (credential: Credential) => void;
}

const CredentialsModal: React.FC<CredentialsModalProps> = ({
  credentials,
  isOpen,
  onOpenChange,
  onCredentialSelect
}) => {
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

  const handleCredentialClick = (credential: Credential) => {
    onCredentialSelect(credential);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          View All Credentials ({credentials.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-300">
        <DialogHeader>
          <DialogTitle>All Test Credentials</DialogTitle>
          <DialogDescription>
            Complete list of test credentials for different roles
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          {credentials.map((cred, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => handleCredentialClick(cred)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{cred.name}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
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
                        copyToClipboard(cred.username, 'Username', `modal-${cred.id}-username`);
                      }}
                    >
                      {copiedStates[`modal-${cred.id}-username`] ? (
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
                        copyToClipboard(cred.password, 'Password', `modal-${cred.id}-password`);
                      }}
                    >
                      {copiedStates[`modal-${cred.id}-password`] ? (
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
      </DialogContent>
    </Dialog>
  );
};

export default CredentialsModal;