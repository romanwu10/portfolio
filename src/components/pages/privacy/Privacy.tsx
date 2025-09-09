import classes from "./Privacy.module.css";

const Privacy = () => {
  return (
    <article className={classes.container}>
      <div className={classes.inner}>
        <h1 className={classes.title}>Privacy Policy for Gemini Enhancer</h1>
        <p className={classes.subtitle}>Last updated: September 9, 2025</p>

        <section className={classes.section}>
          <h2>Overview</h2>
          <p>
            Gemini Enhancer adds UI on gemini.google.com to help write prompts.
            This page summarizes the minimal data the extension stores and the
            limited permissions it uses. No analytics, tracking, or third‑party
            servers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Data Stored</h2>
          <ul className={classes.list}>
            <li>
              <strong>chrome.storage.sync</strong> — <code className={classes.code}>slashCommands</code>
              (small map of trigger→prompt) for optional cross‑device sync.
            </li>
            <li>
              <strong>chrome.storage.local</strong> — <code className={classes.code}>autosavedContent_gemini</code>
              <code className={classes.code}>{"{url, text, timestamp}"}</code> to restore unsent drafts on the same
              device.
            </li>
          </ul>
          <p>
            Not collected or sent: browsing history, personal identifiers, chat
            content, analytics, or telemetry. No developer‑controlled servers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>How data is used</h2>
          <ul className={classes.list}>
            <li>All processing runs locally in your browser.</li>
            <li>No cross‑origin requests, background networking, or remote code.</li>
            <li>
              For sync, Chrome may store a copy in your Google account; it is
              encrypted in transit and can be end‑to‑end encrypted if you set a
              sync passphrase.
            </li>
          </ul>
        </section>

        <section className={classes.section}>
          <h2>Permissions</h2>
          <ul className={classes.list}>
            <li>
              <code className={classes.code}>host_permissions: https://gemini.google.com/*</code>
              — required solely to run the declarative content script and
              stylesheet on Gemini pages (adds follow‑up UI, slash‑command
              autocomplete, and autosave).
            </li>
            <li>
              <code className={classes.code}>storage</code> — to store
              <code className={classes.code}>slashCommands</code> (sync) and
              <code className={classes.code}>autosavedContent_gemini</code>
              (local).
            </li>
            <li>No <code className={classes.code}>activeTab</code> permission.</li>
            <li>No <code className={classes.code}>tabs</code> permission.</li>
          </ul>
        </section>

        <section className={classes.section}>
          <h2>Control</h2>
          <ul className={classes.list}>
            <li>
              Manage or delete saved slash commands and drafts from the
              extension’s popup UI.
            </li>
            <li>Removing the extension clears all stored data.</li>
          </ul>
        </section>
        
      </div>
    </article>
  );
};

export default Privacy;
