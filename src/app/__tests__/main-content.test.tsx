import { render, screen, fireEvent } from '@testing-library/react';
import { MainContent } from '../main-content';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/chat/ChatInterface', () => ({
  ChatInterface: () => <div data-testid="chat-interface">Chat</div>,
}));

vi.mock('@/components/editor/FileTree', () => ({
  FileTree: () => <div data-testid="file-tree">FileTree</div>,
}));

vi.mock('@/components/editor/CodeEditor', () => ({
  CodeEditor: () => <div data-testid="code-editor">CodeEditor</div>,
}));

vi.mock('@/components/preview/PreviewFrame', () => ({
  PreviewFrame: () => <div data-testid="preview-frame">PreviewFrame</div>,
}));

vi.mock('@/components/HeaderActions', () => ({
  HeaderActions: () => <div data-testid="header-actions">HeaderActions</div>,
}));

describe('MainContent Toggle Buttons', () => {
  it('should toggle between preview and code views when clicking buttons', () => {
    render(<MainContent />);

    // Initially should show preview
    expect(screen.getByTestId('preview-frame')).toBeInTheDocument();
    expect(screen.queryByTestId('code-editor')).not.toBeInTheDocument();

    // Click Code button
    const codeButton = screen.getByRole('tab', { name: /code/i });
    fireEvent.click(codeButton);

    // Should now show code view
    expect(screen.queryByTestId('preview-frame')).not.toBeInTheDocument();
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
    expect(screen.getByTestId('file-tree')).toBeInTheDocument();

    // Click Preview button
    const previewButton = screen.getByRole('tab', { name: /preview/i });
    fireEvent.click(previewButton);

    // Should show preview again
    expect(screen.getByTestId('preview-frame')).toBeInTheDocument();
    expect(screen.queryByTestId('code-editor')).not.toBeInTheDocument();
  });

  it('should handle rapid clicking without issues', () => {
    render(<MainContent />);

    const codeButton = screen.getByRole('tab', { name: /code/i });
    const previewButton = screen.getByRole('tab', { name: /preview/i });

    // Rapidly click between tabs
    fireEvent.click(codeButton);
    fireEvent.click(previewButton);
    fireEvent.click(codeButton);
    fireEvent.click(previewButton);
    fireEvent.click(codeButton);

    // Should end on code view
    expect(screen.queryByTestId('preview-frame')).not.toBeInTheDocument();
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });
});
