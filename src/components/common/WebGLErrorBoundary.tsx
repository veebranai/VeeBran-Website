"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    isChecked: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            isChecked: false
        };
    }

    public componentDidMount() {
        if (!this.isWebGLAvailable()) {
            this.setState({ hasError: true, isChecked: true });
        } else {
            this.setState({ isChecked: true });
        }
    }

    private isWebGLAvailable(): boolean {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true, isChecked: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Suppress
    }

    public render() {
        // Prevent hydration mismatch by waiting for client check
        if (!this.state.isChecked) {
            return null;
        }

        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex items-center justify-center w-full h-full bg-black/20 text-white/30 text-xs">
                    <span className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" />
                        3D Disabled
                    </span>
                </div>
            );
        }

        return this.props.children;
    }
}
