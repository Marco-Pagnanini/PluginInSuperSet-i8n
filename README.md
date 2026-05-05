
# PluginInSuperSet-i8n 🌍
<img width="1679" height="914" alt="Screenshot 2026-05-05 114243" src="https://github.com/user-attachments/assets/0c6f565f-befe-4e69-be54-411fbc9bdb56" />
**PluginInSuperSet-i8n** is a custom Apache Superset plugin designed to enable dynamic multi-language support (i18n) directly within charts. Unlike standard Superset charts, this plugin allows for the real-time translation of metrics, dimensions, and other UI elements based on the user's profile or context variables.

## 🌟 The Problem Solved
In standard Apache Superset, metric labels are static. If you label a metric "Total Sales," it remains in that language for every user regardless of their locale. This plugin overcomes this structural limitation by allowing labels to change dynamically, eliminating the need to create duplicate charts for different languages.

## ✨ Key Features
*   **Multi-language Metrics**: Dynamic translation of metric names within the chart legend.
*   **Dynamic Dimensions**: Support for i18n mapping of dimension labels.
*   **Jinja Integration**: Full compatibility with Superset Jinja macros (e.g., `{{ current_user_locale() }}`).
*   **Intuitive UI**: An extended control panel that allows users to input language mappings without needing to write complex SQL for every label.

## 🛠 Plugin Architecture
Built with **React** and **TypeScript**, this plugin extends the core capabilities of Superset's visualization architecture.

### Main Components:
*   `ControlPanel.tsx`: Modified to include input fields for localized strings and translation maps.
*   `transformProps.ts`: The "engine" of the plugin that intercepts query data and applies the correct language strings before the chart is rendered.
*   `buildQuery.ts`: Handles the SQL generation logic to ensure dynamic labels are processed correctly by the database engine.

## 🚀 Installation

1.  **Clone the repository** into your Superset frontend plugins directory:
    ```bash
    git clone [https://github.com/your-username/PluginInSuperSet-i8n.git](https://github.com/your-username/PluginInSuperSet-i8n.git)
    ```
2.  **Install dependencies**:
    ```bash
    cd PluginInSuperSet-i8n
    npm install
3.  **Build the plugin**:
    ```bash
    npm run build

4.  **Register the plugin**: Add the plugin to your `MainPreset.js` file within the Superset frontend source to make it available in the chart gallery.

## 📖 Usage Example
Within the plugin's translation fields or Custom SQL blocks, you can implement logic such as:

```sql
CASE 
    WHEN '{{ current_user_locale() }}' = 'it' THEN 'Vendite Totali'
    ELSE 'Total Sales'
END


