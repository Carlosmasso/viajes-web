import * as React from "react"

const TabsContext = React.createContext(null);

export function Tabs({ defaultValue, children, className = "" }) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, onValueChange: setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }) {
  return (
    <div className="flex gap-4">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = "" }) {
  const context = React.useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }

  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={`px-6 py-3 font-medium text-md transition-colors border-b-2 ${
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-foreground hover:text-primary'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }) {
  const context = React.useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsContent must be used within Tabs');
  }

  if (context.value !== value) {
    return null;
  }

  return <div className={className}>{children}</div>;
}
