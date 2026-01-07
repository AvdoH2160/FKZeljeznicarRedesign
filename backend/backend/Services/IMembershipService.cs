using backend.Model;
using backend.ViewModel;

namespace backend.Services
{
    public interface IMembershipService
    {
        Task ApplyAsync(int userId, MembershipApplicationDto dto);
        Task ApproveAsync(Guid applicationId);
        Task RejectAsync(Guid id);
        Task RenewAsync(int userId, MembershipRenewalDto dto);
        Task<Membership?> GetMyMembershipAsync(int userId);
        Task<MembershipCheckDto> CheckAsync(string code);

        Task<List<MembershipApplication>> GetPendingMembershipsAsync();
        Task<List<Membership>> GetActiveMembershipsAsync();
    }
}
