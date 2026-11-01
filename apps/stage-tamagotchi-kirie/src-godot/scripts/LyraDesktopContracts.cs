using System.Text.Json;
using System.Text.Json.Serialization;
using Eventa;
using GdKirie.EventaAdapter;

internal sealed record EmptyPayload;
internal sealed record OpenSettingsPayload(string? Route);
internal sealed record SettingsNavigatePayload(string Route);
internal sealed record OpenDevtoolsWindowPayload(
    string Key,
    string? Route,
    int? Width,
    int? Height,
    int? X,
    int? Y);
internal sealed record NoticeOpenPayload(
    string? Id,
    string Route,
    string? Type,
    Dictionary<string, JsonElement>? Payload);
internal sealed record NoticePagePayload(string? Id);
internal sealed record NoticePendingPayload(
    string Id,
    string? Type,
    Dictionary<string, JsonElement>? Payload);
internal sealed record NoticeActionPayload(string Id, string Action);
internal sealed record AuthTokensPayload(
    string AccessToken,
    string? RefreshToken,
    string? IdToken,
    int ExpiresIn);
internal sealed record AuthErrorPayload(string Error);
internal sealed record AuthConfigurationPayload(string ClientId, string ServerUrl);
internal sealed record DesktopDisplayBoundsPayload(int X, int Y, int Width, int Height);
internal sealed record DesktopDisplaySnapshotPayload(
    DesktopDisplayBoundsPayload Bounds,
    DesktopDisplayBoundsPayload WorkArea,
    float Scale);
internal sealed record MicrophonePermissionStatePayload(string Permission, string State);
internal sealed record MicrophonePermissionPromptPayload(string Permission, string PromptId);
internal sealed record MicrophonePermissionPromptSnapshotPayload(string Permission, string? PromptId);
internal sealed record MicrophonePermissionDecisionPayload(string PromptId, string Decision);
internal sealed record MicrophonePermissionPromptDismissedPayload(string PromptId);
internal sealed record SpotlightAcceleratorPayload(string Key, string[] Modifiers);
internal sealed record SpotlightShortcutSetPayload(SpotlightAcceleratorPayload? Accelerator);
internal sealed record SpotlightShortcutRegistrationResultPayload(
    string Id,
    bool Ok,
    string? Reason,
    SpotlightAcceleratorPayload? ActualAccelerator);

/// <summary>
/// Localized tray menu labels. The main renderer owns LYRA translations and sends them to Godot.
/// </summary>
internal sealed record TrayLabelsPayload(
    string Show,
    string AdjustSizes,
    string RecommendedSize,
    string FullHeight,
    string HalfHeight,
    string FullScreen,
    string AlignTo,
    string Center,
    string TopLeft,
    string TopRight,
    string BottomLeft,
    string BottomRight,
    string Settings,
    string About,
    string OpenInlay,
    string OpenWidgets,
    string OpenCaption,
    string CaptionOverlay,
    string FollowWindow,
    string ResetPosition,
    string Devtools,
    string TroubleshootBeatSync,
    string Quit);

internal static class LyraDesktopEvents
{
    public static readonly InvokeEventDefinition<EmptyPayload, EmptyPayload> OpenOnboarding =
        new("eventa:invoke:electron:windows:onboarding:open");

    public static readonly InvokeEventDefinition<EmptyPayload, EmptyPayload> CloseOnboarding =
        new("eventa:invoke:electron:windows:onboarding:close");

    public static readonly InvokeEventDefinition<EmptyPayload, OpenSettingsPayload> OpenSettings =
        new("eventa:invoke:electron:windows:settings:open");

    public static readonly EventDefinition<SettingsNavigatePayload> SettingsNavigate =
        new("eventa:event:electron:windows:settings:navigate");

    public static readonly EventDefinition<EmptyPayload> SettingsReady =
        new("eventa:event:electron:windows:settings:ready");

    public static readonly InvokeEventDefinition<EmptyPayload, EmptyPayload> OpenChat =
        new("eventa:invoke:electron:windows:chat:open");

    public static readonly InvokeEventDefinition<EmptyPayload, EmptyPayload> OpenMainDevtools =
        new("eventa:invoke:electron:windows:main:devtools:open");

    public static readonly InvokeEventDefinition<EmptyPayload, OpenDevtoolsWindowPayload> OpenDevtoolsWindow =
        new("eventa:invoke:electron:windows:devtools:open");

    public static readonly EventDefinition<EmptyPayload> ChatReady =
        new("eventa:event:electron:windows:chat:ready");

    public static readonly InvokeEventDefinition<EmptyPayload, EmptyPayload> QuitApp =
        new("eventa:invoke:electron:app:quit");

    public static readonly InvokeEventDefinition<bool, NoticeOpenPayload> OpenNotice =
        new("eventa:invoke:open:electron:windows:notice");

    public static readonly InvokeEventDefinition<EmptyPayload, NoticeActionPayload> NoticeAction =
        new("eventa:invoke:action:electron:windows:notice");

    public static readonly InvokeEventDefinition<NoticePendingPayload?, NoticePagePayload> NoticePageMounted =
        new("eventa:invoke:page-mounted:electron:windows:notice");

    public static readonly InvokeEventDefinition<EmptyPayload, NoticePagePayload> NoticePageUnmounted =
        new("eventa:invoke:page-unmounted:electron:windows:notice");

    public static readonly InvokeEventDefinition<EmptyPayload, EmptyPayload> AuthStartLogin =
        new("eventa:invoke:electron:auth:start-login");

    public static readonly EventDefinition<AuthTokensPayload> AuthCallback =
        new("eventa:event:electron:auth:callback");

    public static readonly EventDefinition<AuthErrorPayload> AuthCallbackError =
        new("eventa:event:electron:auth:callback-error");

    public static readonly InvokeEventDefinition<EmptyPayload, EmptyPayload> AuthLogout =
        new("eventa:invoke:electron:auth:logout");

    public static readonly InvokeEventDefinition<EmptyPayload, AuthConfigurationPayload> AuthConfigure =
        new("eventa:invoke:lyra:auth:configure");

    public static readonly InvokeEventDefinition<DesktopDisplaySnapshotPayload, EmptyPayload> GetCurrentDisplaySnapshot =
        new("eventa:invoke:lyra:desktop:current-display:get");

    public static readonly InvokeEventDefinition<MicrophonePermissionStatePayload, EmptyPayload>
        GetMicrophonePermissionState =
            new("eventa:invoke:lyra:permissions:microphone:get-state");

    public static readonly InvokeEventDefinition<MicrophonePermissionPromptSnapshotPayload, EmptyPayload>
        GetMicrophonePermissionPrompt =
            new("eventa:invoke:lyra:permissions:microphone:get-prompt");

    public static readonly InvokeEventDefinition<MicrophonePermissionStatePayload, EmptyPayload>
        ResetMicrophonePermission =
            new("eventa:invoke:lyra:permissions:microphone:reset");

    public static readonly InvokeEventDefinition<EmptyPayload, MicrophonePermissionDecisionPayload>
        ResolveMicrophonePermissionPrompt =
            new("eventa:invoke:lyra:permissions:microphone:resolve-prompt");

    public static readonly EventDefinition<MicrophonePermissionStatePayload>
        MicrophonePermissionStateChanged =
            new("eventa:event:lyra:permissions:microphone:state-changed");

    public static readonly EventDefinition<MicrophonePermissionPromptPayload>
        MicrophonePermissionPromptRequested =
            new("eventa:event:lyra:permissions:microphone:prompt-requested");

    public static readonly EventDefinition<MicrophonePermissionPromptDismissedPayload>
        MicrophonePermissionPromptDismissed =
            new("eventa:event:lyra:permissions:microphone:prompt-dismissed");

    public static readonly InvokeEventDefinition<EmptyPayload, EmptyPayload> OpenSpotlight =
        new("eventa:invoke:electron:windows:spotlight:open");

    public static readonly InvokeEventDefinition<EmptyPayload, EmptyPayload> HideSpotlight =
        new("eventa:invoke:electron:windows:spotlight:hide");

    public static readonly InvokeEventDefinition<SpotlightAcceleratorPayload, EmptyPayload>
        GetSpotlightShortcut =
            new("eventa:invoke:electron:windows:spotlight:shortcut:get");

    public static readonly InvokeEventDefinition<
        SpotlightShortcutRegistrationResultPayload,
        SpotlightShortcutSetPayload> SetSpotlightShortcut =
            new("eventa:invoke:electron:windows:spotlight:shortcut:set");

    public static readonly EventDefinition<SpotlightAcceleratorPayload> SpotlightShortcutChanged =
        new("eventa:event:lyra:windows:spotlight:shortcut-changed");

    public static readonly InvokeEventDefinition<EmptyPayload, TrayLabelsPayload> SetTrayLabels =
        new("eventa:invoke:lyra:tray:labels:set");
}

internal static class LyraDesktopContracts
{
    public static KirieEventaJsonRegistry Register(KirieEventaJsonRegistry registry)
    {
        return registry
            .RegisterInvoke(
                LyraDesktopEvents.OpenOnboarding,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.CloseOnboarding,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.OpenSettings,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.OpenSettingsPayload)
            .RegisterEvent(
                LyraDesktopEvents.SettingsNavigate,
                LyraDesktopJsonContext.Default.SettingsNavigatePayload)
            .RegisterEvent(
                LyraDesktopEvents.SettingsReady,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.OpenChat,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.OpenMainDevtools,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.OpenDevtoolsWindow,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.OpenDevtoolsWindowPayload)
            .RegisterEvent(
                LyraDesktopEvents.ChatReady,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.QuitApp,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.OpenNotice,
                LyraDesktopJsonContext.Default.Boolean,
                LyraDesktopJsonContext.Default.NoticeOpenPayload)
            .RegisterInvoke(
                LyraDesktopEvents.NoticeAction,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.NoticeActionPayload)
            .RegisterInvoke(
                LyraDesktopEvents.NoticePageMounted,
                LyraDesktopJsonContext.Default.NoticePendingPayload,
                LyraDesktopJsonContext.Default.NoticePagePayload)
            .RegisterInvoke(
                LyraDesktopEvents.NoticePageUnmounted,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.NoticePagePayload)
            .RegisterInvoke(
                LyraDesktopEvents.AuthStartLogin,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterEvent(
                LyraDesktopEvents.AuthCallback,
                LyraDesktopJsonContext.Default.AuthTokensPayload)
            .RegisterEvent(
                LyraDesktopEvents.AuthCallbackError,
                LyraDesktopJsonContext.Default.AuthErrorPayload)
            .RegisterInvoke(
                LyraDesktopEvents.AuthLogout,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.AuthConfigure,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.AuthConfigurationPayload)
            .RegisterInvoke(
                LyraDesktopEvents.GetCurrentDisplaySnapshot,
                LyraDesktopJsonContext.Default.DesktopDisplaySnapshotPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.GetMicrophonePermissionState,
                LyraDesktopJsonContext.Default.MicrophonePermissionStatePayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.GetMicrophonePermissionPrompt,
                LyraDesktopJsonContext.Default.MicrophonePermissionPromptSnapshotPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.ResetMicrophonePermission,
                LyraDesktopJsonContext.Default.MicrophonePermissionStatePayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.ResolveMicrophonePermissionPrompt,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.MicrophonePermissionDecisionPayload)
            .RegisterEvent(
                LyraDesktopEvents.MicrophonePermissionStateChanged,
                LyraDesktopJsonContext.Default.MicrophonePermissionStatePayload)
            .RegisterEvent(
                LyraDesktopEvents.MicrophonePermissionPromptRequested,
                LyraDesktopJsonContext.Default.MicrophonePermissionPromptPayload)
            .RegisterEvent(
                LyraDesktopEvents.MicrophonePermissionPromptDismissed,
                LyraDesktopJsonContext.Default.MicrophonePermissionPromptDismissedPayload)
            .RegisterInvoke(
                LyraDesktopEvents.OpenSpotlight,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.HideSpotlight,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.GetSpotlightShortcut,
                LyraDesktopJsonContext.Default.SpotlightAcceleratorPayload,
                LyraDesktopJsonContext.Default.EmptyPayload)
            .RegisterInvoke(
                LyraDesktopEvents.SetSpotlightShortcut,
                LyraDesktopJsonContext.Default.SpotlightShortcutRegistrationResultPayload,
                LyraDesktopJsonContext.Default.SpotlightShortcutSetPayload)
            .RegisterEvent(
                LyraDesktopEvents.SpotlightShortcutChanged,
                LyraDesktopJsonContext.Default.SpotlightAcceleratorPayload)
            .RegisterInvoke(
                LyraDesktopEvents.SetTrayLabels,
                LyraDesktopJsonContext.Default.EmptyPayload,
                LyraDesktopJsonContext.Default.TrayLabelsPayload);
    }
}

[JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
[JsonSerializable(typeof(EmptyPayload))]
[JsonSerializable(typeof(OpenSettingsPayload))]
[JsonSerializable(typeof(SettingsNavigatePayload))]
[JsonSerializable(typeof(OpenDevtoolsWindowPayload))]
[JsonSerializable(typeof(bool))]
[JsonSerializable(typeof(NoticeOpenPayload))]
[JsonSerializable(typeof(NoticePagePayload))]
[JsonSerializable(typeof(NoticePendingPayload))]
[JsonSerializable(typeof(NoticeActionPayload))]
[JsonSerializable(typeof(AuthTokensPayload))]
[JsonSerializable(typeof(AuthErrorPayload))]
[JsonSerializable(typeof(AuthConfigurationPayload))]
[JsonSerializable(typeof(DesktopDisplayBoundsPayload))]
[JsonSerializable(typeof(DesktopDisplaySnapshotPayload))]
[JsonSerializable(typeof(MicrophonePermissionStatePayload))]
[JsonSerializable(typeof(MicrophonePermissionPromptPayload))]
[JsonSerializable(typeof(MicrophonePermissionPromptSnapshotPayload))]
[JsonSerializable(typeof(MicrophonePermissionDecisionPayload))]
[JsonSerializable(typeof(MicrophonePermissionPromptDismissedPayload))]
[JsonSerializable(typeof(SpotlightAcceleratorPayload))]
[JsonSerializable(typeof(SpotlightShortcutSetPayload))]
[JsonSerializable(typeof(SpotlightShortcutRegistrationResultPayload))]
[JsonSerializable(typeof(TrayLabelsPayload))]
internal sealed partial class LyraDesktopJsonContext : JsonSerializerContext;
